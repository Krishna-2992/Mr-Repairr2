const { Partner } = require('../models/partner'); // Assuming the model is stored in models folder

// Get partners based on filters: profession, serviceLocation, gender, and id
const getFilteredPartners = async (req, res) => {
    try {
        const { profession, serviceLocation, gender, id } = req.query;

        // Constructing the filter object based on the request query parameters
        const filter = {};

        if (profession) {
            filter.profession = { $regex: new RegExp(profession, 'i') };
        }
        if (serviceLocation) {
            // Case-insensitive search for serviceLocation
            filter.serviceLocation = { $regex: new RegExp(serviceLocation, 'i') };
        }
        if (gender) {
            filter.gender = gender;
        }
        if (id) {
            filter._id = id;
        }

        const partners = await Partner.find(filter);
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching partners', error });
    }
};

const createPartner = async (req, res) => {
    const { name, age, gender, contactNumber, profession, address, serviceLocation } = req.body;
    try {
        const newPartner = await Partner.create({ name, age, gender, contactNumber, profession, address, serviceLocation });
        res.status(201).json(newPartner);
    } catch (error) {
        res.status(500).json({ message: 'Error creating partner', error });
    }
}

// Exporting the functions to use them in routes
module.exports = {
    getFilteredPartners,
    createPartner
};
