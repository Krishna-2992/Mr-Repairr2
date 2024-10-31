import axios from 'axios';
import { useLocation } from 'react-router-dom';
import data from '../data/data.json';
import electricianImage from '../assets/electrician.png';
import plumberImage from '../assets/plumber.png';
import carpenterImage from '../assets/carpenter.png';
import pestControlImage from '../assets/pest_control.jpg';
import { useState } from 'react';

export default function ContactPartner() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const initialProfession = params.get('profession');

    const professionImages = {
        Electrician: electricianImage,
        Plumber: plumberImage,
        Carpenter: carpenterImage,
        "Pest Control": pestControlImage,
    };

    const [userDetails, setUserDetails] = useState({
        name: '',
        contactNumber: '',
        address: '',
        profession: initialProfession || '',
        problemDescription: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const query = await createQuery();
        const availablePartners = await getAvailablePartners();
        sendTwilioMsg(query, availablePartners);
    };

    const sendTwilioMsg = async (query, partners) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/twilio`, {
                query: query,
                partners: partners
            });
            console.log('Twilio response:', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAvailablePartners = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/partners?profession=${userDetails.profession}&serviceLocation=${userDetails.address}`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Failed to fetch available partners");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createQuery = async () => {
        const queryObj = {
            customerDetails: {
                name: userDetails.name,
                contactNumber: userDetails.contactNumber,
                address: userDetails.address,
                problemDescription: userDetails.problemDescription
            },
            professionRequired: userDetails.profession,
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/queries`, queryObj);
            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error('Failed to create query');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const professionData = data.professions.find(p => p.title.toLowerCase() === userDetails.profession.toLowerCase());
    const professionImageUrl = professionData ? professionImages[professionData.title] : '';


    return (
        <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="w-full md:w-1/2 p-4">
                <h1 className="text-3xl font-bold mb-4">Contact Partner</h1>
                {userDetails.profession ? (
                    <div className='flex flex-col items-center'>
                        <p className="text-lg">You are looking for a: <strong>{userDetails.profession}</strong></p>
                        {professionImageUrl && (
                            <img
                                src={professionImageUrl}
                                alt={userDetails.profession}
                                className="mt-4 h-48 rounded-md shadow-md"
                            />
                        )}
                    </div>
                ) : (
                    <p>No profession specified.</p>
                )}
            </div>
            <div className="w-full md:w-1/2 p-4">
                <h2 className="text-xl font-semibold mb-4">Get Contact Details</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <select
                        name="profession"
                        value={userDetails.profession}
                        onChange={handleChange}
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        required
                    >
                        <option value="" disabled>Select a profession</option>
                        {data.professions.map((profession) => (
                            <option key={profession.id} value={profession.title}>
                                {profession.title}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={userDetails.name}
                        onChange={handleChange}
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        required
                    />
                    <input
                        type="tel"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={userDetails.contactNumber}
                        onChange={handleChange}
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={userDetails.address}
                        onChange={handleChange}
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        required
                    />
                    <textarea
                        name="problemDescription"
                        placeholder="Describe your problem"
                        value={userDetails.problemDescription}
                        onChange={handleChange}
                        className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        required
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 transition duration-200">
                        Contact Partner Now!!
                    </button>
                </form>
            </div>
        </div>
    );
}