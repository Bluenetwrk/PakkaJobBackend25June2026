const mongoose = require("mongoose")

const ConsultationSchema= new mongoose.Schema({

  ServiceName: {
    type:String,
    required: true
  },
  date:{

  },
  description:{
    type:String
  },
  category:{
    type:String
  },
  Price:{
    type: Number
  },
  features:[
    {
        type:String
    }
  ],
  priceId:{
    type:String
  }

},
{timestamps:true})

const servicemodel = mongoose.model("consultationPlan",ConsultationSchema)

module.exports = servicemodel