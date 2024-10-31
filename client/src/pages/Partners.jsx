import { useEffect, useState } from "react";

export default function Partners() {
    const [partners, setPartners] = useState([]);
    const [filteredPartners, setFilteredPartners] = useState([]);
    const [selectedProfession, setSelectedProfession] = useState('');

    useEffect(() => {
        fetchPartners();
    }, []);

    async function fetchPartners() {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/partners`);
        const data = await response.json();
        setPartners(data);
        setFilteredPartners(data); // Initialize with all partners
    }

    // Function to handle profession filter change
    const handleProfessionChange = (e) => {
        const profession = e.target.value;
        setSelectedProfession(profession);

        if (profession) {
            const filtered = partners.filter(partner => partner.profession === profession);
            setFilteredPartners(filtered);
        } else {
            setFilteredPartners(partners); // Reset to all partners if no profession is selected
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Partners</h1>
            <div className="mb-4">
                <label htmlFor="profession" className="mr-2">Filter by Profession:</label>
                <select
                    id="profession"
                    value={selectedProfession}
                    onChange={handleProfessionChange}
                    className="border rounded p-2"
                >
                    <option value="">All</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Pest Control">Pest Control</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map(partner => (
                    <div key={partner._id} className="bg-white text-black border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold">{partner.name}</h2>
                        <p><strong>Age:</strong> {partner.age}</p>
                        <p><strong>Gender:</strong> {partner.gender}</p>
                        <p><strong>Contact Number:</strong> {partner.contactNumber}</p>
                        <p><strong>Profession:</strong> {partner.profession}</p>
                        <p><strong>Address:</strong> {partner.address}</p>
                        <p><strong>Service Location:</strong> {partner.serviceLocation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
