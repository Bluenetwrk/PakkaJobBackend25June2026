const mongoose = require('mongoose')
const LinkedInSchema = new mongoose.Schema({
  linkedinId: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePicture: String,
});
const LinkedInUser = mongoose.model('LinkedInUsers', LinkedInSchema);
module.exports = LinkedInUser