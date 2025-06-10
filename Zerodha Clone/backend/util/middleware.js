const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UsersModel }=require("../model/UsersModel");
const { FundsModel }=require("../model/FundsModel")
const SECRET=process.env.SECRET;
const createSecretToken=(id)=>{
  return jwt.sign({id},SECRET,{expiresIn:3*24*60*60,});
};
const Signup=async(req,res,next)=>{
  try {
    const {email,password,username}=req.body;
    const existingUser=await UsersModel.findOne({email});
    if(existingUser){
      return res.json({message:"User already exists"});
    };
    const newUser=new UsersModel({email,password,username});
    await newUser.save();
    const newFunds = new FundsModel({
      userId: newUser._id,
      openingBalance: 0,
      payin: 0,
      availableCash: 0,
      availableMargin: 0,
      usedMargin: 0,
    });
    await newFunds.save();
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
    httpOnly: true,      
    secure: true,        
    sameSite: "none",    
    maxAge: 3 * 24 * 60 * 60 * 1000, 
    });
    return res.status(201).json({
      message:"User signed in successfully",
      success: true,
      user:newUser.username
    });
  } catch (error) {
    next(error);
  }
};
const Login=async(req,res,next)=>{
  try {
    const {email,password}=req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user=await UsersModel.findOne({email});
    if(!user){
      return res.json({message:"Invalid password or email"});
    };
    const auth = await bcrypt.compare(password,user.password);
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
    httpOnly: true,      
    secure: true,        
    sameSite: "none",    
    maxAge: 3 * 24 * 60 * 60 * 1000, 
    });
    return res.status(201).json({
      message:"User signed in successfully",
      success: true,
      user:user.username
    });
  } catch (error) {
    next(err);
  }
};
// const userVerification=(req,res)=>{
//     const token = req.cookies.token;
//     if (!token) {
//     return res.json({ status: false });
//     };
//     jwt.verify(token, SECRET, async (err, data) => {
//         if (err) {
//          return res.json({ status: false })
//         } else {
//           const user = await UsersModel.findById(data.id);
//           if (user) return res.json({ status: true, user: user.username })
//           else return res.json({ status: false })
//         }
//     });
// };
const userVerification = async (req, res) => {
    const token = req.cookies?.token; 

    if (!token) {
        return res.json({ status: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        const userId = decoded.id; 
        const user = await UsersModel.findById(userId);

        if (user) {
            return res.json({ status: true, user: user.username, message: 'User verified successfully' });
        } else {
            return res.json({ status: false, message: 'User not found' });
        }
    } catch (err) {
        console.error("Token verification error:", err.message); 
        return res.json({ status: false, message: 'Invalid or expired token' });
    }
};

module.exports={Signup,Login,userVerification};
