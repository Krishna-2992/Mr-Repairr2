import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BecomePartner from './pages/BecomePartner'
import Partners from './pages/Partners'
import ContactPartner from './pages/ContactPartner'
import ReserveQuery from './pages/ReserveQuery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/become-partner" element={<BecomePartner />}></Route>
        <Route path="/partners" element={<Partners />}></Route>
        <Route path="/contact-partner" element={<ContactPartner />}></Route>
        <Route path='/reserve-query' element={<ReserveQuery />}></Route>
      </Routes>

    </>
  )
}

export default App
