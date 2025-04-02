const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,isAuthenticated,isAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");
router.post("/",isAuthenticated,validateReview,wrapAsync(reviewController.crateReview));
router.delete("/:reviewId",isAuthenticated,isAuthor,wrapAsync(reviewController.destroyReview));
module.exports=router;