const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const {validateUser,saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(validateUser,wrapAsync(userController.signupUser));
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(userController.loginUser));
router.get("/logout",userController.logoutUser);
router.get("/privacy",userController.privacy);
router.get("/terms",userController.terms);
module.exports=router;