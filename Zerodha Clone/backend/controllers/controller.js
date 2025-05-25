const {HoldingsModel}=require("../model/HoldingsModel");
const {OrdersModel}=require("../model/OrdersModel");
const {FundsModel}=require("../model/FundsModel");
const {UsersModel}=require("../model/UsersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
module.exports.getAllHoldings=async(req,res)=>{
  const token = req.cookies.token;
  const decoded = jwt.verify(token, SECRET);
  const userId = decoded.id;
  const allHoldings=await HoldingsModel.find({userId});
  res.json(allHoldings);
};
module.exports.getAllOrders=async(req,res)=>{
  const token = req.cookies.token;
  const decoded = jwt.verify(token, SECRET);
  const userId = decoded.id;
  const allOrders = await OrdersModel.find({userId});
  res.json(allOrders);
};
module.exports.newOrders=async(req,res)=>{
  const { user, name, qty, price, mode } = req.body;
  const fundUser = await UsersModel.findOne({ username:user });
  const fund=await FundsModel.findOne({userId:fundUser._id});
  const cost=qty*price;
  if (mode === "BUY") {
    if (fund.availableCash < cost) {
      return res.status(400).json({ error: "Insufficient funds to place order" });
    }
    fund.usedMargin += cost;
    fund.availableCash -= cost;
    fund.availableMargin = fund.availableCash;
    await fund.save();
    const newOrder=new OrdersModel({userId: fundUser._id,name,qty,price,mode});
    await newOrder.save();
    const newHolding = new HoldingsModel({userId: fundUser._id,name,qty,price});
    await newHolding.save();
    return res.json({ message: "Buy order placed and funds updated" });
  };
  if (mode === "SELL") {
    let remainingQty = qty;
    const stocks = await HoldingsModel.find({ userId: fundUser._id, name }).sort({ createdAt: 1 });
    const totalQty = stocks.reduce((sum, stock) => sum + stock.qty, 0);
    if (totalQty < remainingQty) {
      return res.status(400).json({ error: "Not enough stock to sell" });
    };
    for (let stock of stocks) {
      if (remainingQty <= 0) break;
      if (stock.qty <= remainingQty) {
        remainingQty -= stock.qty;
        await HoldingsModel.findByIdAndDelete(stock._id);
      } else {
        stock.qty -= remainingQty;
        remainingQty = 0;
        await stock.save();
      }
    }
    fund.usedMargin -= cost;
    if (fund.usedMargin < 0) fund.usedMargin = 0;
    fund.availableCash += cost;
    fund.availableMargin = fund.availableCash;
    await fund.save();
    const newOrder = new OrdersModel({ userId: fundUser._id, name, qty, price, mode });
    await newOrder.save();
    return res.json({ message: "Sell order placed and margin released" });
  }
};
module.exports.depositFunds=async (req,res) => {
  try {
    const { user, amount } = req.body;
    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid deposit amount" });
    }
    const fundUser = await UsersModel.findOne({ username:user });
    const fund=await FundsModel.findOne({userId:fundUser._id});
    if (fund.openingBalance === 0 && fund.payin === 0 && fund.availableCash === 0) {
      fund.openingBalance = amount;
      fund.payin = 0;
      fund.availableCash = amount - fund.usedMargin;
      fund.availableMargin = fund.availableCash;
    } else {
      fund.openingBalance = fund.openingBalance+fund.payin;
      fund.payin = amount;
      fund.availableCash = fund.availableCash + fund.payin;
      fund.availableMargin = fund.availableCash;
    }
    await fund.save();
    return res.json({ message: `₹${amount} deposited successfully`, fund }); 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports.getfunds=async (req,res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, SECRET);
  const userId = decoded.id;
  const user = await UsersModel.findById(userId);
  const fund=await FundsModel.findOne({userId});
  res.json({
    user:user.username,
    ...fund.toObject()
  });
};
module.exports.userVerification=async (req,res) => {
  const { username, password }=req.body;
  if(!username || !password ){
    return res.json({message:'All fields are required'})
  }
  const user=await UsersModel.findOne({username});
  if(!user){
    return res.json({message:"Invalid password or username"});
  };
  const auth = await bcrypt.compare(password,user.password);
  if (!auth) {
    return res.json({message:'Incorrect password or username' }) 
  }
  return res.status(201).json({
    message:"User verified successfully",
    success: true,
  });
};
module.exports.withdrawFunds = async (req, res) => {
  try {
    const { user, amount } = req.body;
    if (!user || amount <= 0 || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid withdrawal request" });
    }
    const fundUser = await UsersModel.findOne({ username: user });
    if (!fundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const fund = await FundsModel.findOne({ userId: fundUser._id });
    if (!fund) {
      return res.status(404).json({ error: "Funds record not found" });
    }
    const maxWithdrawable = fund.availableCash;
    if (amount > maxWithdrawable) {
      return res.status(400).json({ error: `Max withdrawable: ₹${maxWithdrawable.toFixed(2)}` });
    }
    fund.availableCash -= amount;
    fund.availableMargin = fund.availableCash;
    fund.openingBalance += fund.payin;
    fund.payin = 0;
    await fund.save();
    return res.json({ message: `₹${amount} withdrawn successfully`, fund });
  } catch (error) {
    console.error("Withdraw error:", error);
    return res.status(500).json({ error: "Withdrawal failed" });
  }
};
