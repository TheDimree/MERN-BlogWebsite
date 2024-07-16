import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
// import Icon from "react-crud-icons";
import './Admin.css'
import Title from '../Title/Title';
// import Pagination from '../Pagination/Pagination';

export default function Admin() {
    const blogs = useLoaderData();
    // const {title, image, category, author, published_date, reading_time, content} = data;
    // console.log("data: ", blogs);
  return (
    <>
    <Title title="All Available Blogs" subTitle="Manage your Blogs" />
    <div className="flex justify-end mr-3">
      <Link to={`/newblog`}>
        <span className='bg-blue-600 text-white py-2 px-4 rounded mr-2 sm:mb-1'>Add New Blog</span>
      </Link>
    </div>
    <div className='admin container'>
        <table className='table border-solid border-black rounded '>
            <thead>
                {/* <tr className='flex justify-between items-center text-lg'>
                    <th scope="col" className='py-2 px-2 w-1/4 ml-10'>Pic</th>
                    <th scope="col" className='py-2 px-2  w-1/4'>Title</th>
                    <th scope="col" className='py-2 px-2 w-1/4'>Author</th>
                    <th scope="col" className='py-2 px-2 w-1/4 mr-10'>Actions</th>
                </tr> */}
            </thead>
            <tbody>
            <tr>
                {blogs.map((blog) => {
                    return (
                        <Link to={`/blogs/${blog.id}`}><div className='flex justify-between items-center'>
                            <td className='py-2 px-2'><img src={blog.image} alt={blog.title} className="md:h-16 w-36 object-cover mb-2 sm:h-16 w-24 h-9" /></td>
                            <td className='py-2 px-2 w-1/3'>{blog.title}</td>
                            <td className='py-2 px-2'>{blog.author}</td>
                            <td className='md:flex justify-center items-center py-2 px-2 sm:flex-wrap justify-center items-center py-2 px-2'>
                                <Link to={`/blogedit/${blog._id}`}><p className='md: bg-red-600 text-white py-2 px-2 rounded mr-2 sm:mb-1'>Edit</p></Link>
                                <Link to={`/blogdelete/${blog._id}`}><button type="button" className="delete-btn md: bg-red-600 text-white py-2 px-2 rounded mr-2">Delete</button></Link>
                            </td>
                        </div></Link>
                )})}
            </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}