import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Title from '../components/Title/Title'
import BlogDetail from '../components/BlogDetail/BlogDetail.js'
import Footer from '../components/Footer/Footer.js'
export default function BlogDetailPage() {
  return (
    <div>
        <Navbar/>
        <div className="container">
            {/* //*Props */}
            <Title subTitle="Blog Detail" title="Here's your blog to read"/>
            <BlogDetail/>                    
        </div>
            <Footer/>
    </div>
)
}