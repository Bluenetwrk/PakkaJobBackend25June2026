const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function dbconnection() {
  // 1. Matches your new Render Dashboard Key
  mongoose.connect(process.env.MONGO_URL)
    .then((res) => { 
      console.log("🚀 Live MongoDB connected successfully!"); 
    })
    .catch((err) => { 
      // 2. Prints the real error text in Render Logs if it fails
      console.error("❌ MongoDB connection failed:", err.message); 
    });
}

module.exports = dbconnection;
