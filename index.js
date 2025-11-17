
const cors = require("cors")
const cookieparser = require("cookie-parser")
const express = require("express");
const app = express();
const StudentProfileRoutes = require("./Routes/StudentProfileRoutes");
const EmpProfileRoutes = require("./Routes/EmpProfileRoutes");
const jobpostRoutes = require("./Routes/JobpostsRoutes");
const BlockRoutes = require("./Routes/BlogPostRoutes");
const CareerjobpostRoutes = require("./Routes/CareerJobpostsRoutes");
const adminRoutes =require("./Routes/AdminRout")
const PaymentRoute = require("./Routes/PaymentRout")
const StudentProfileModel = require("./Schema/StudentProfileSchema")
const EmployeeProfileModel = require("./Schema/EmpProfileSchema")
const QuestionRoute=require("./Routes/AskQuestionRoutes")
const WalkinPostRoutes = require("./Routes/WalkinPostRoutes");
const reportFraudRoutes = require("./Routes/ReportFraudRoutes")
// const AuthRoutes = require("./Routes/AuthRoute.js") 
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const port = 8080
const { MongoClient } = require("mongodb")
const dbconnection=require('./DbConnection')
dbconnection()
// dbconnection()
app.use(express.json())
app.use(cors())
app.use(cookieparser())
const fs=require("fs")
app.use(passport.initialize());

// Configure Passport LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    // callbackURL: "http://localhost:3000/auth/linkedin/callback",
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['openid profile email w_member_social'],
}, function (accessToken, refreshToken, profile, done) {
    // Here you can save user data to DB
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// // LinkedIn login route
// app.get('/auth/linkedin', passport.authenticate('linkedin'));

// // LinkedIn callback route
// app.get('/auth/linkedin/callback',
//     passport.authenticate('linkedin', { session: false }),
//     (req, res) => {
//         // Generate JWT token
//         const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.redirect(`http://localhost:3000/login-success?token=${token}`);
//     }
// );
// app.get('LinkedIn', (req, res) => {
//   const scope = 'openid profile email w_member_social';
//   const redirectURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&scope=${scope}`;
//   res.redirect(redirectURL);
// });
app.use(express.static('public'))
app.use("/StudentProfile",StudentProfileRoutes)
app.use("/EmpProfile",EmpProfileRoutes)
app.use("/jobpost", jobpostRoutes)
app.use("/BlogRoutes",BlockRoutes)
app.use("/QuestionRoute",QuestionRoute)
app.use("/walkinRoute", WalkinPostRoutes)
app.use("/Careerjobpost", CareerjobpostRoutes)
app.use("/admin", adminRoutes)
app.use("/paymentAPI", PaymentRoute)
app.use("/ReportFraud", reportFraudRoutes)
// app.use("/LinkedIn", AuthRoutes)



app.use("*", (req, res) => {    // if no API are made 
        res.send(" Itwalkin could not fetch this API")    
})


const http = require("http")
const Server = require('socket.io').Server
const server = http.createServer(app)


const io= new Server(server,{
    cors:{
        origin:"*",
        credentials: true
    }
})
// const uns=io.of('/student-namespace')

io.on('connection',  async(socket)=>{
    let token = socket.handshake.auth.token    
    let result =await EmployeeProfileModel.findByIdAndUpdate({_id:token},{$set:{online:true}})
    if(result===null){
    let result =await StudentProfileModel.findByIdAndUpdate({_id:token},{$set:{online:true}})
    }
    socket.on("disconnect", async ()=>{        
        let token = socket.handshake.auth.token
        let result =await StudentProfileModel.findByIdAndUpdate({_id:token},{$set:{online:false}})
        if(result===null){
            let result =await EmployeeProfileModel.findByIdAndUpdate({_id:token},{$set:{online:false}})
            }
    })
})

server.listen(port, () => {
    console.log(`app running on port ${port} for booking`)
})
