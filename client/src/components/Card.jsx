export default function Card({ image, title, description }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:cursor-pointer">
            <img src={image} alt={title} className="w-full h-48 object-contain" />
            <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
}
