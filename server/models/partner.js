const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contactNumber: { type: String, required: true },
    profession: { type: String, required: true },
    address: { type: String, required: true },
    serviceLocation: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the model
const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = { Partner };
