import React from 'react'
import Hero from "../components/Hero/Hero"
import Navbar from "../components/Nav/Navbar"
import Features from "../components/Feature/Feature"
import Process from '../components/Process/Process'
import Faq from '../components/Faq/Faq'
import Footer from '../components/Footer/Footer'

const Savora = () => {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <Features/>
        <Process/>
        <Faq/>
        <Footer/>
    </div>
  )
}

export default Savora