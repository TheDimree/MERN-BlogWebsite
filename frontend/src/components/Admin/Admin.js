import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
// import Icon from "react-crud-icons";
import "./Admin.css";
import Title from "../Title/Title";
// import Pagination from '../Pagination/Pagination';
import axios from 'axios';

export default function Admin() {
    const [blogs, setBlogs] = useState(useLoaderData());

    const handleDelete = async (id) => {
        const url = `http://localhost:8008/deleteblog/${id}`
        try {
            const response = await fetch(
                url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const msg = await response.json();
            if (response.ok) {
                // console.log("Blog post deleted:", msg);
            } else {
                console.error("Failed to delete blog post:", msg);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(()=> {  //* Fetching from Database
        function fetchData() {
          let url = `http://localhost:8008/blogs`;
          axios.get(url)
          .then(function(response) {
            // console.log("blogs:",response.data)
            setBlogs(response.data);
          }).catch(function(err){
            console.log(err)
          })
        }
        
        fetchData();
    
      },[blogs])

    return (
        <>
            <Title title="All Available Blogs" subTitle="Manage your Blogs" />
            <div className="flex justify-end mr-4">
                <Link to={`/newblog`}>
                    <span className="bg-blue-600 text-white py-2 px-4 rounded mr-2 sm:mb-1">
                        Add Blog
                    </span>
                </Link>
            </div>
            <div className="admin container my-3">
                <table className="table border-solid border-black rounded ">
                    <thead>
                        {/* <tr className='flex justify-between items-center text-lg'>
                    <th scope="col" className='py-2 px-2 w-1/4 ml-10'>Pic</th>
                    <th scope="col" className='py-2 px-2  w-1/4'>Title</th>
                    <th scope="col" className='py-2 px-2 w-1/4'>Author</th>
                    <th scope="col" className='py-2 px-2 w-1/4 mr-10'>Actions</th>
                </tr> */}
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td className="py-2 px-2">
                                    <Link to={`/blogs/${blog._id}`}>
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="md:h-16 w-36 object-cover mb-2 sm:h-16 w-24 h-9"
                                        />
                                    </Link>
                                </td>
                                <td className="py-2 px-2 w-1/4">
                                    <Link to={`/blogs/${blog._id}`}>
                                        {blog.title}
                                    </Link>
                                </td>
                                <td className="py-2 px-2">
                                    {blog.author}
                                </td>
                                <td className="md:flex justify-center items-center py-2 px-2 sm:flex-wrap justify-center items-center py-2 px-2">
                                    <Link to={`/blogedit/${blog._id}`}>
                                        <p className="md:bg-red-600 text-white py-2 px-2 rounded mr-2 sm:mb-1">
                                            Edit
                                        </p>
                                    </Link>
                                    <button
                                        type="button"
                                        className="delete-btn md:bg-red-600 text-white py-2 px-2 rounded mr-2 sm:mb-1"
                                        onClick={() => handleDelete(blog._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    );
}
