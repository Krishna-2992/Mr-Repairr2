import { Link } from 'react-router-dom'

import plumberImage from '../assets/plumber.png'
import electricianImage from '../assets/electrician.png'
import carpenterImage from '../assets/carpenter.png'
import pestControlImage from '../assets/pest_control.jpg'
import Card from './Card'
import data from '../data/data.json'
export default function OurServices() {

    const professionImages = {
        Electrician: electricianImage,
        Plumber: plumberImage,
        Carpenter: carpenterImage,
        "Pest Control": pestControlImage,
    };

    return (
        <div id="our-services" className="bg-gray-50 text-gray-800 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-xl text-gray-600">We offer a wide range of services to meet your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                {data.professions.map((profession) => (
                    <Link to={`/contact-partner?profession=${profession.title}`}>
                        <Card
                            key={profession.title}
                            image={professionImages[profession.title]}
                            title={profession.title}
                            description={profession.description}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}
