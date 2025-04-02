const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("/Users/Satvik/Desktop/Projects/Full Stack/Airbnb Clone/models/listings.js");
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};
main()
    .then((res)=>{
        console.log("Connection Successful");
    })
    .catch((err)=>{
        console.log(err);
    });    
const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"67e13a45095067fe2e750c98"}))
    await Listing.insertMany(initData.data);
};
initDB();
