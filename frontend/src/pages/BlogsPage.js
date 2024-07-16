import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Title from '../components/Title/Title'
import Blogs from '../components/Blogs/Blogs.js'
import Footer from '../components/Footer/Footer.js'
export default function BlogsPage() {
  return (
    <div>
        <Navbar/>
        <div className="container">
            {/* //*Props */}
            <Title subTitle="Our all posts" title="Explore your hobbies with us"/>
            <Blogs/>                    
        </div>
            <Footer/>
    </div>
)
}