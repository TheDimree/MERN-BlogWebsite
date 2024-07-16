import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Title from '../components/Title/Title'
import Home from '../components/Home/Home'
import Footer from '../components/Footer/Footer.js'


// import data from '../../../data'


export default function HomePage() {
    return (
        <div>
            <Navbar/>
            <div className="container">
                {/* //*Props */}
                <Title subTitle="Welcome to the Hub of Blogs" title="Start your journey today and join a community of writers and readers."/>
                <Home/>                    
            </div>
                <Footer/>
        </div>
    )
}