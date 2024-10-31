const { Query } = require('../models/query');
const twilio = require('twilio')

// Create a new query
const createQuery = async (req, res) => {
    const { customerDetails, professionRequired } = req.body;
    try {
        // Validate required fields
        if (!customerDetails || !professionRequired) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newQuery = new Query({
            customerDetails,
            professionRequired,
            queryStatus: 'pending',
            reservedBy: null,
            createdAt: Date.now()
        });

        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (error) {
        res.status(500).json({ message: 'Error creating query', error });
    }
};

// Get a query by its ID
const getQueryById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the query by its ID in the database
        const query = await Query.findById(id);

        // If no query found, return a 404 error
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Send a success response with the query data
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving query', error });
    }
};

// Get all queries
const getAllQueries = async (req, res) => {
    try {
        // Retrieve all queries from the database
        const queries = await Query.find();

        // Send a success response with the list of all queries
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving queries', error });
    }
};

// Update a query to reserve it for a partner
const updateQuery = async (req, res) => {
    const { id } = req.params; // Get the query ID from the URL parameters
    const { reservingPartner } = req.body; // Get the reserving partner ID from the request body

    try {
        // Find the query by its ID and update it with just the partner's ID
        const updatedQuery = await Query.findByIdAndUpdate(
            id,
            { reservedBy: reservingPartner._id, queryStatus: 'reserved' }, // Update reservedBy with partner ID and status
            { new: true, runValidators: true } // Return the updated document and validate
        );

        // If no query is found, return a 404 error
        if (!updatedQuery) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Send a success response with the updated query data
        res.status(200).json(updatedQuery);
    } catch (error) {
        console.error('Error updating query:', error);
        res.status(500).json({ message: 'Error updating query', error });
    }
};


// Export the controller functions
module.exports = {
    createQuery,
    getQueryById,
    getAllQueries,
    updateQuery
};