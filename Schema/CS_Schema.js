const mongoose = require("mongoose")

const profileSchema= new mongoose.Schema({
    image : {
        type:String
    },   
    CSId:{
        type: String
    },
    jobseeker_name:{
        type: String
    },
    jobseeker_email:{
        type: String,
        unique: true
    },
    jobseeker_phone:{
        type:String
    },
    created_date:{
        type:Date
    },
    resume_type:{
        type: String
    },
    created_resume:{
        type: String
    },
    name:{
        type:String
    },
    email: {
        type: String,
        unique: true
    },
    ipAddress:{
        type:String
    },
    message:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    Aadhar:{
        type:String
    },
    panCard:{
        type:String
    },
    CompanyGSTIN:{
        type:String
    },
    CompanyCIN:{
        type:String
    },
    AboutCompany:{
        type:String
    },
    secondaryuserDesignation:{
        type:String
    },
    
    CompanyName:{
        type:String
    },
    CompanyContact:{
        type:String
    },
    CompanyWebsite :{
        type:String
    },
    CompanyAddress:{
        type:String
    },
    CompanyEmail:{
        type:String
    },
    TypeofOrganisation:{
        type:String
    },
    isApproved:{
        type:Boolean
    },
    isReject:{
        type:Boolean
    },
    isOnhold:{
        type:Boolean
    },
    LogedInTime:{
        type:Date
    },
    online:{
        type:Boolean
    }
},
{timestamps:true}
)

const profileModel= mongoose.model("CS-Profile",profileSchema)

module.exports=profileModel