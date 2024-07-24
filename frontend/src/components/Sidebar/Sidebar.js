import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Sidebar({blogs}) {
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([]);

    useEffect(()=> {
      const sortedBlogsByViews = blogs.sort((a, b) => b.views_count - a.views_count);
      setPopularBlogs(sortedBlogsByViews);
      const sortedBlogsByAuthor = blogs.filter((obj) => obj.author==="Bhagesh Dimri").sort((a, b) => b.views_count - a.views_count);
      setLatestBlogs(sortedBlogsByAuthor);
    },[blogs]);

  return (
    <div>
      {/* Latest Blog  */}
      <div>
        <h3 className='text-2xl font-semibold px-4'>Our Choice</h3>
        <div>
            {latestBlogs.slice(0,4).map((blog) => 
            <div key={blog.id} className='my-5 border-b-2 border-spacing-2 px-4'>
                <h4>{blog.title}</h4>
                <Link to='/' className='text-base pb-2 hover:text-orange-500 inline-flex items-center py-1'>Read more <FaArrowRight className='mt-1 ml-2'/></Link>
            </div>)}
        </div>
      </div>

      {/* Popular Blogs */}
      <div>
        <h3 className='text-2xl font-semibold px-4 mt-20'>Popular Blogs</h3>
        <div>
            {popularBlogs.slice(0,4).map((blog) => 
            <div key={blog.id} className='my-5 border-b-2 border-spacing-2 px-4'>
                <h4>{blog.title}</h4>
                <Link to='/' className='text-base pb-2 hover:text-orange-500 inline-flex items-center py-1'>Read more <FaArrowRight className='mt-1 ml-2'/></Link>
            </div>)}
        </div>
      </div>
    </div>
  )
}