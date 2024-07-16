import React from 'react'
import Contact from '../components/Contact/Contact'
import Navbar from '../components/Navbar/Navbar'
import Title from '../components/Title/Title'
import Footer from '../components/Footer/Footer.js'

export default function ContactPage() {
  return (
    <div>
        <Navbar/>
        <div className="container">
            {/* //*Props */}
            <Title subTitle="Contact Us" title="Get in Touch"/>
            <Contact/>
        </div>
          <Footer/>
    </div>
  )
}
