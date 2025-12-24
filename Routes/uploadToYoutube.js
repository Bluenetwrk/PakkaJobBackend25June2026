const express = require("express");
const router = express.Router();
const StudentProfileModel = require("../Schema/StudentProfileSchema")

async function uploadToYoutube(filePath) {  
 const oauth2Client = new google.auth.OAuth2(  
 process.env.CLIENT_ID,  
 process.env.CLIENT_SECRET  
 );  
 oauth2Client.setCredentials({  
 refresh_token: process.env.REFRESH_TOKEN  
 });  
 const youtube = google.youtube({  
 version: "v3",  
 auth: oauth2Client  
 });  
 const response = await youtube.videos.insert({  
 part: "snippet,status",  
 requestBody: {  
 snippet: {  
 title: "User Uploaded Video",  
 description: "Uploaded from website"
 },  
 status: {  
 privacyStatus: "unlisted"  
 }  
 },  
 media: {  
 body: fs.createReadStream(filePath)  
 }  
 });  
 const videoId = response.data.id;  
 return `https://www.youtube.com/watch?v=${videoId}`;  
}
module.exports = router