const {Schema}=require("mongoose");
const {model}=require("mongoose");
const HoldingsSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    name: String,
    qty: Number,
    price: Number,
});
const HoldingsModel=new model("holding",HoldingsSchema);
module.exports={HoldingsModel};