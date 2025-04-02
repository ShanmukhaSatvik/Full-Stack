const mongoose = require("mongoose");
const Review=require("./review.js");
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        filename: { type: String, default: "listingimage" },
        url: { type: String }
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        },
    },
    categories:{
        type:[String],
        enum:["Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools","Farms","Arctic","Domes","Boats","Historical Landmarks","Golfing","Camping","Ski-in/out","Beach","Towers"],
    },
    views: {
        type: Number,
        default: 0
    },
});
listingSchema.post("findOneAndDelete",async (listing) => {
    if (listing) {
        await Review.deleteMany({_id:{$in:listing.reviews}});   
    } 
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
