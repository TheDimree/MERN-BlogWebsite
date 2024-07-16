import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'

export default function BlogCards({data, currentPage, selectedCategory, pageSize}) {
    const filteredBlogs = data.filter((blogs)=> (!selectedCategory || blogs.category === selectedCategory));
    const filteredBlogsData = filteredBlogs.slice((currentPage-1)*pageSize, currentPage*pageSize)
    
    // console.log("currentPage ", currentPage);

    return (
    <>
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {
            filteredBlogsData.map((blog) => <Link to={`/blogs/${blog._id}`} key = {blog._id} className='p-5 shadow-lg rounded cursor-pointer'>
                <div>
                    <img src={blog.image} alt="" className="w-full"/>
                </div>
                <h3 className='mt-4 mb-2 font-bold hover: text-blue-600 cursor-pointer'>{blog.title}</h3>
                <p className='mb-2 text-sm text-gray-400'><FaUser className='inline-flex items-center mr-2'></FaUser>{blog.author}</p>
                <p className='text-sm text-gray-400'>Published: {blog.published_date}</p>
                <p className='text-sm text-gray-400'>Total Views: {blog.views_count}</p>
            </Link>)
        }
        </div>

    
    {/* //* Using an Array from a file stored in src folder. */}
    {/* <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {
            data.map((blog) => <Link key = {blog.id} className='p-5 shadow-lg rounded cursor-pointer'>
                <div>
                    <img src={blog.image} alt="" className="w-full"/>
                </div>
                <h3 className='mt-4 mb-2 font-bold hover: text-blue-600 cursor-pointer'>{blog.title}</h3>
                <p className='mb-2 text-sm text-gray-400'><FaUser className='inline-flex items-center mr-2'></FaUser>{blog.author}</p>
                <p className='text-sm text-gray-400'>Published: {blog.published_date}</p>
            </Link>)
        } 
        </div> */}
    </>
  )
}