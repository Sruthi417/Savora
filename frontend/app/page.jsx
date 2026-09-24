import React from 'react'
import Hero from "../components/Hero/Hero"
import Navbar from "../components/Nav/Navbar"
import FeatureCard from "../components/Feature/Feature"
import Process from '../components/Process/Process'
import Faq from '../components/Faq/Faq'
import Footer from '../components/Footer/Footer'

const Savora = () => {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <FeatureCard/>
        <Process/>
        <Faq/>
        <Footer/>
    </div>
  )
}

export default Savora