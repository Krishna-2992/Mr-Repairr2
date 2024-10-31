import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ReserveQuery() {
    const location = useLocation();
    const [queryDetails, setQueryDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isReserved, setIsReserved] = useState(false);
    const [isQueryAlreadyReserved, setIsQueryAlreadyReserved] = useState(false); // For checking if already reserved

    // Extract queryId and partnerId from the URL
    const params = new URLSearchParams(location.search);
    const queryId = params.get('queryId');
    const partnerId = params.get('partnerId');

    // Fetch query details by queryId
    useEffect(() => {
        const fetchQueryDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/queries/${queryId}`);
                const data = await response.json();
                console.log("query details: ", data)
                setQueryDetails(data);
                setLoading(false);

                // Check if the query is already reserved
                if (data.queryStatus === 'reserved') {
                    setIsQueryAlreadyReserved(true); // Set flag if already reserved
                }
            } catch (error) {
                console.error('Error fetching query details:', error);
                setLoading(false);
            }
        };

        if (queryId) {
            fetchQueryDetails();
        }
    }, [queryId]);


    const handleReserve = async () => {
        try {
            const partner = await axios.get(`${import.meta.env.VITE_SERVER_URL}/partners?id=${partnerId}`);
            console.log("partner found: ", partner)
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/queries/${queryId}`, {
                reservingPartner: partner.data, // Pass partner details to reserve the query
            });

            if (response.status === 200) {
                setIsReserved(true); // Set state to true after successful reservation
                alert('Query successfully reserved!');
            } else {
                alert('Error reserving query: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error reserving the query:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isQueryAlreadyReserved) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">This query has already been reserved</h1>
                <p className="text-gray-600">Sorry, another partner has already reserved this query. You cannot reserve it anymore.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {queryDetails ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Reserve Query</h1>
                    <div className="mb-4">
                        <strong>Address:</strong> {queryDetails.customerDetails.address}
                    </div>
                    <div className="mb-4">
                        <strong>Problem Description:</strong> {queryDetails.problemDescription}
                    </div>
                    <div className="mb-4">
                        <strong>Time Raised:</strong> {new Date(queryDetails.createdAt).toLocaleString()}
                    </div>

                    {/* Blurred Customer Details Section */}
                    <div className="mb-4">
                        <div className="mb-2">
                            <strong>Name:</strong>
                            <span style={{ filter: isReserved ? 'none' : 'blur(5px)' }}>
                                {isReserved ? queryDetails.customerDetails.name : 'John Doe'}
                            </span>
                        </div>
                        <div className="mb-2">
                            <strong>Contact Number:</strong>
                            <span style={{ filter: isReserved ? 'none' : 'blur(5px)' }}>
                                {isReserved ? queryDetails.customerDetails.contactNumber : '123-XXXXXXX'}
                            </span>
                        </div>
                        {!isReserved && (
                            <p className="text-gray-500">
                                Reserve the query to reveal actual customer details.
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleReserve}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Reserve Query
                    </button>
                </div>
            ) : (
                <div>No query details found.</div>
            )}
        </div>
    );
}
