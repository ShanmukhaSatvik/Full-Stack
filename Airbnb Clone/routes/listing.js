const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {uploadImage,validateNewListing,validateUpdatedListing,isAuthenticated,isAuthorized}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isAuthenticated,uploadImage,validateNewListing,wrapAsync(listingController.createListing));
router.get("/new",isAuthenticated,listingController.renderNewForm);
router.get("/filters/:category",wrapAsync(listingController.filteredCategory));
router.get("/search", wrapAsync(listingController.searchListings));
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isAuthenticated,isAuthorized,uploadImage,validateUpdatedListing,wrapAsync(listingController.updateListing))
    .delete(isAuthenticated,isAuthorized,wrapAsync(listingController.destroyListing));
router.get("/:id/edit",isAuthenticated,isAuthorized,wrapAsync(listingController.renderEditForm));
module.exports=router;