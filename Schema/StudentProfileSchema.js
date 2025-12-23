const mongoose = require("mongoose")

const profileSchema= new mongoose.Schema({
    image : {
        type:String
        // type:Buffer
    },
    Plan:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'consultationPlan'
    },
    subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'canceled'],
    default: 'inactive',
     },
    paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
   },
   phonePeTxnId: {
        type:String
    },
    CustomerId: {
        type:String
     },
    Gpicture : { 
        type:String
     },
    userId: {
        type: String
    },
    name:{
        type:String
    },
    profileData: {
        type: String
    },
    profileSummary:{
        type: String
    },
    city:{
        type:Object
    },
    college:{
        type:Object
    },
    selectedCountry:{

    },
    currentEmp:{

    },
    employers:[

    ],
    Qualification:{

    },
    tenth:{

    },
    twelfth:{

    },
    degree:{

    },
    saveComent:{

    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber:{
        type:String
    },
    Aadhar:{
        type:String
    },
    message:{
    type:String

    },
    imageConsent:{
        type:Boolean
    },
    external:{
        type:Boolean
    },
    disclaimerConsent:{
        type: Boolean
    },
    uploadConsent:{
        type: Boolean
    },
    ipAddress:{
        type:String
    },
    panCard:{
        type:String
    },
    NoticePeriod:{
        type:String
    },
    ExpectedSalary :{
        type:String
    },
    currentCTC:{
        type:String
    },
    age:{
        type:String
    },
    EditResumeCounter:{
        
    },
    DownloadResumeCounter:{

    },
    qualificationDetails:[{
        degree:{
            type:String
        },
        score:{
            type:String
        },
        collegeName:{
            type:String
        },
        stateCode:{
            type:String
        },
        countryCode:{
            type:String
        },
        studyField:{
            type:String
        },
         yop:{
            type:String
        },
        city:{
            type:String
        } ,
        country:{
            type:String
         }
    }],
    Skills:{
        type:String
    },
    Experiance:{
        type:String
    },
    status:{
       select: {
            type:String}
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
    },
    Tags:[
        
    ],
    personalDetails:[{
        gender: {
            type:String
        },
        maritalStatus: {
            type:String
        },
        dob: {
            type:Date
        }, 
        fatherName:{
            type:String
        },
        motherName:{
            type:String
        },
        Nationality:{
            type:String
        }
    }],
    achievements: [{type:String}],
    interests: [{type:String}],
    projects:[{type:String}],
    tokenNo:[{
        tokenNo:{
        type:Number
    },
        Date:{
            type : Date
        }    
    }
    ],
    linkedin:{
        type:String
    },
    message:{
        type:String
    },
    HRsEmployerFeedBack:[
    
],
    address:{
        type:String
    },
    totalExperience:{
        type: String
    },
    experiences:[{
        company:{
            type: String
        },
        role:{
            type:String
        },
        startDate:{
            type: Date
        },
        endDate:{
            type: Date
        },
        descriptions: [
        
        ]
        }],
        certifications:[

        ],
        skills:[{
            heading:{

            },
            items:{

            }
        }],
        languages:[
        ],
        interview:[{

            tokenNo:{},
   
            driveId:{},
   
            scannedDateTime:{}
   
}]
},
{timestamps:true})

const profileModel= mongoose.model("JobSeeker-Profile",profileSchema)

module.exports=profileModel