const express = require('express');
const partnerController = require('../controllers/partnerController'); // Adjust the path as necessary

const router = express.Router();

// Define routes for partner operations
router
    .route('/partners')
    .get(partnerController.getFilteredPartners) // Get all partners
    .post(partnerController.createPartner); // Add a route for creating a new partner (you'll need to implement this function in the controller)

module.exports = router;

