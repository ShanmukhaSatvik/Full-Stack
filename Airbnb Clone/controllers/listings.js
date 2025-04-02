const axios = require("axios");
const Listing=require("../models/listings");
const ExpressError=require("../utils/ExpressError.js");
const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;
module.exports.index=async(req,res)=>{
    let listings=await Listing.find({});
    res.render("listings/index.ejs",{listings});
};
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};
async function getCoordinates(location, country) {
    const address = `${location}, ${country}`;
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json`;
    try{
        const response = await axios.get(url, {
            params:{key: MAPTILER_API_KEY, limit: 1}
        });
        return response.data.features[0]?.geometry || null;
    }catch (error){
        console.error("Geocoding Error:", error);
        return null;
    };
};
module.exports.createListing=async(req,res)=>{
    const {location,country} = req.body;
    const geometry = await getCoordinates(location, country);
    const listing=new Listing({
        ...req.body,
        image:{
            url:req.file.path,
            filename:req.file.filename
        },
        geometry,
        owner:req.user._id,
    });
    await listing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");   
};
module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id)
        .populate({path:"reviews",populate:{path:"author"}})
        .populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist!");
        return res.redirect("/listings");
    };
    listing.views = (listing.views || 0) + 1;
    await listing.save();
    res.render("listings/show.ejs",{listing});
};
module.exports.filteredCategory=async(req,res)=>{
    const {category} = req.params;
    let listings;
    if(category==="Trending"){
        listings=await Listing.find().sort({views:-1}).limit(5);
    }else{
        listings = await Listing.find({categories:category});   
    }
    if(!listings.length){   
        req.flash("error","No listings found for this category!");
        return res.redirect("/listings");
    }
    res.render("listings/index.ejs", {listings});
};
module.exports.renderEditForm=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist!");
        return res.redirect("/listings");
    };
    let originalImgUrl=listing.image.url;
    if(originalImgUrl.includes("res.cloudinary.com")){
        originalImgUrl = originalImgUrl.replace("/upload", "/upload/h_250,w_250/");
    }else if(originalImgUrl.includes("images.unsplash.com")){
        originalImgUrl = originalImgUrl.replace(/w=\d+/, "w=250").replace(/h=\d+/, "h=250").replace(/fit=\w+/, "fit=crop");
        if(!originalImgUrl.includes("&h=")) originalImgUrl += "&h=250";
        if(!originalImgUrl.includes("&fit=")) originalImgUrl += "&fit=crop";
    };
    res.render("listings/edit.ejs",{listing,originalImgUrl});
};
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    const {location,country} = req.body;
    const geometry = await getCoordinates(location,country);
    let listing=await Listing.findByIdAndUpdate(id,{...req.body,geometry});
    if(typeof req.file !== "undefined"){
        listing.image={url:req.file.path,filename:req.file.filename};
        await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        return next(new ExpressError(404,"Listing not Found"));
    };
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};
module.exports.searchListings = async (req, res) => {
    const {query} = req.query; 
    if (!query) {
        return res.redirect("/listings");
    };
    const listings = await Listing.find({
        $or: [
            { location: { $regex: new RegExp(query, "i") } }, 
            { country: { $regex: new RegExp(query, "i") } }   
        ]
    });
    if(!listings.length){
        req.flash("error",`No listings found for your search "${query}". Please try another location.`);
        return res.redirect("/listings");
    };
    res.render("listings/index.ejs", {listings,query});
};