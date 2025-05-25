const {Schema}=require("mongoose");
const {model}=require("mongoose");
const OrdersSchema=new Schema({
    userId:{
      type:Schema.Types.ObjectId,
      ref:"user",
    },
    name: String,
    qty: Number,
    price: Number,
    mode:String,
    createdAt: {
    type: Date,
    default: Date.now
  }
});
const OrdersModel=new model("order",OrdersSchema);
module.exports={OrdersModel};