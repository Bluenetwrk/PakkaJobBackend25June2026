// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const Service = require("../Schema/ConsultationservicesSchema");
var nodemailer = require('nodemailer');

// Get all services
router.get("/getServices", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new service
router.post("/addService", async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.json(newService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})
// router.update("/updateService", async(req,res) => {
    
// })
router.post("/selectService", async (req, res) => {
  try {
    const { userEmail, userName, serviceId } = req.body;
    const service = await Service.findById(serviceId);

    if (!service) return res.status(404).json({ error: "Service not found" });

    // Mail to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Service Confirmation",
      text: `Hi ${userName},\n\nYou have successfully chosen the service: ${service.name}.\nDescription: ${service.description}\nPrice: $${service.price}\n\nThank you!`,
    });

    // Mail to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Service Selection",
      text: `User ${userName} (${userEmail}) selected the service: ${service.name}.\nDetails:\n${service.description}\nPrice: $${service.price}`,
    });

    res.json({ message: "Service selected and emails sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;