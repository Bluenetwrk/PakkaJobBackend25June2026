const mongoose = require("mongoose")

const ReportFraud = new mongoose.Schema({
    misuseType:{
        type:String
    },
    selectedOption:{
        type: String

    },
    issues:{
        type: String

     }
    //  ,
    // showSuccessMessage:{

    // },
    // email:{
    //     type: String,
    //     unique: true
    // }
},
{timestamps:true})

const reportFraudModel = mongoose.model("Reported-Frauds", ReportFraud)
module.exports = reportFraudModel