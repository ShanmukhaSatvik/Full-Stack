const bcrypt = require("bcryptjs");
const {Schema}=require("mongoose");
const {model}=require("mongoose");
const UsersSchema=new Schema({
    email: String,
    username: String,
    password: String,
});
UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (!this.password) {
    return next(new Error("Password is undefined"));
  };
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const UsersModel=new model("user",UsersSchema);
module.exports={UsersModel};