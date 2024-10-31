import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function BecomePartner() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        contactNumber: '',
        profession: '',
        address: '',
        serviceLocation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/partners`, formData);
            if (response.status === 201) {
                alert('Partner created successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Error creating partner:', error);
            alert('Failed to create partner');
        }
    };

    return (
        <div className=''>
            <div className="max-w-2xl mx-auto py-16">
                <h2 className="text-4xl font-bold text-center mb-8">Become a Partner</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Age Field */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter your age"
                            required
                        />
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            required
                        >
                            <option value="" disabled>Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Contact Number Field */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter your contact number"
                            required
                        />
                    </div>

                    {/* Profession Field */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Profession</label>
                        <select
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            required
                        >
                            <option value="" disabled>Select your profession</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Carpenter">Carpenter</option>
                            <option value="Pest Control">Pest Control</option>
                        </select>
                    </div>

                    {/* Address Field */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    {/* Service Location Field */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Service Location</label>
                        <input
                            type="text"
                            name="serviceLocation"
                            value={formData.serviceLocation}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter the service location"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button type="submit" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}