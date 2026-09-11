const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function dbconnection() {
  // 1. Matches your new Render Dashboard Key
  mongoose.connect(process.env.URL)
    .then((res) => { console.log("connected"); 
    })
    .catch((err) => {console.error("failed:"); 
    });
}

module.exports = dbconnection;
