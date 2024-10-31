import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <div className="flex flex-row justify-between px-20 items-center p-2">
            <Link to={'/'}>
                <div className="text-2xl font-bold">Mr. Repairr</div>
            </Link>
            <Link to="/become-partner">
                <button className="button button-primary p-2 border border-primary rounded-lg">
                    Become Partner
                </button></Link>
        </div>
    )
}