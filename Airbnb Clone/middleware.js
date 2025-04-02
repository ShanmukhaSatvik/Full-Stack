const Listing=require("./models/listings.js");
const Review=require("./models/review.js")
const ExpressError=require("./utils/ExpressError.js");
const multer = require('multer');
const {storage}=require("./cloudConfig.js");
const upload = multer({storage});
const {createListingSchema,updateListingSchema,reviewSchema,userSchema}=require("./schema.js");
const uploadImage = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if(err){
            req.flash("error", err.message);
            if (req.originalUrl === "/listings") {
                return res.redirect("/listings/new");
            }else{
                return res.redirect(req.originalUrl);
            }
        }
        next();
    });
};
const validateNewListing=(req,res,next)=>{
    if(req.file){
        req.body.image = req.file;
    };
    let {error}=createListingSchema.validate(req.body,{abortEarly: false});
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        req.flash("error", errMsg);
        return res.redirect("/listings/new");
    }else{
        next();
    };
};
const validateUpdatedListing=(req,res,next)=>{
    if(req.file){
        req.body.image = req.file;
    }
    let {error}=updateListingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        req.flash("error", errMsg);
        return res.redirect(req.originalUrl);
    }else{
        next();
    };
};
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else {
        next();
    }
};
const validateUser=(req,res,next)=>{
    let {error}=userSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    };
};
const isAuthenticated=(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Please log in to continue to this page.");
        return res.redirect('/login');
    };
};
const saveRedirectUrl=(req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};
const isAuthorized=async(req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("error","Unauthorized action! You don’t have permission to make changes to this listing.");
        return res.redirect(`/listings/${id}`);
    };
    next();
}
const isAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if((!review.author._id.equals(req.user._id))){
        req.flash("error","Unauthorized action! You don’t have permission to make changes to this review.");
        return res.redirect(`/listings/${id}`);
    };
    next();
};
module.exports={uploadImage,validateNewListing,validateUpdatedListing,validateReview,validateUser,isAuthenticated,saveRedirectUrl,isAuthorized,isAuthor};




