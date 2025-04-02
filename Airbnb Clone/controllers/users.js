const User=require("../models/user.js");
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signupUser=async(req,res)=>{
    let {username,email,password}=req.body;
    try{
        let user = await User.register(new User({username,email}),password);
        req.login(user, (err) => {
            if(err){
                return next(err);
            };
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    };
};
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.loginUser=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        };
        req.flash("success","You’ve successfully logged out!");
        res.redirect("/listings");
    });
};
module.exports.privacy=async(req,res)=>{
    res.render("users/privacy.ejs");
};
module.exports.terms=async(req,res)=>{
    res.render("users/terms.ejs");
};