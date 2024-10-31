const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    customerDetails: {
        name: { type: String, required: true },
        contactNumber: { type: String, required: true },
        address: { type: String, required: true },
        problemDescription: { type: String, required: true }
    },
    professionRequired: { type: String, required: true },
    queryStatus: { type: String, enum: ['pending', 'reserved', 'completed'], default: 'pending' },
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }, // reference to the Partner who reserved
    createdAt: { type: Date, default: Date.now }
});

const Query = mongoose.model('Query', querySchema);
module.exports = { Query };
