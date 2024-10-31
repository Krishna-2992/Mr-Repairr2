import tapFix from '../assets/tap-fix.webp'
import { Link } from 'react-scroll'

export default function Hero() {
    return (
        <div
            className='pt-16'
            style={{
                backgroundImage: `url(${tapFix})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%',
            }}
        >
            <div className='text-black'>
                <h1 className="text-5xl font-bold">Mr. Repairr</h1>
                <p className="text-xl">One place solution of all your requirements</p>
                <Link to="our-services" smooth={true} duration={500}>
                    <button className='button button-primary p-2 border border-primary rounded-lg bg-green-400 mt-8 p-4 hover:bg-green-600'>
                        <div className='text-xl font-semibold'>Check our services</div>
                    </button>
                </Link>
            </div>
        </div>
    )
}
