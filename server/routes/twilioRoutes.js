const express = require('express');
const twilioController = require('../controllers/twilioController'); // Adjust the path as necessary

const router = express.Router();

// Define routes for partner operations
router
    .route('/twilio')
    .post(twilioController.sendPartnerSms); // Add a route for creating a new partner (you'll need to implement this function in the controller)

module.exports = router;
