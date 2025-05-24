require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const router=require("./routes/route");
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;
const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
async function main() {
    await mongoose.connect(uri);
};
main()
  .then((res) => {
      console.log("DB Connection Successful");
  })
  .catch((err) => {
      console.log(err);
  });
app.use("/",router);
app.use((req, res) => {
    res.status(404).json({ error: "Route not found", path: req.path });
});
