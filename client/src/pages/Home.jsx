import { useEffect } from 'react'
import Hero from '../components/Hero'
import OurServices from '../components/OurServices'

export default function Home() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <Hero />
            <OurServices />
        </div>
    )
}