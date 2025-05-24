const {Schema}=require("mongoose");
const {model}=require("mongoose");
const FundsSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    openingBalance: Number,
    payin: Number,
    availableCash: Number,
    availableMargin: Number,
    usedMargin: Number
});
const FundsModel=new model("fund",FundsSchema);
module.exports={FundsModel};