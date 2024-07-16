import React, { useEffect, useState } from "react";
import axios from 'axios';
import BlogCards from "../BlogCards/BlogCards.js";
import Pagination from "../Pagination/Pagination.js";
import CategorisedBlogs from "../CategorisedBlogs/CategorisedBlogs.js";
// import Sidebar from "../Sidebar/Sidebar.js";
// import data from "../../data.js";

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; //Blogs per page
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryBlogs, setCategoryBlogs] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  //* Data fetched from json file, using nodejs.
  // useEffect(()=>{
  //   async function fetchData() {
  //     let url = `http://localhost:8008/blogs`;
      
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setBlogs(data);
  //     // console.log("Data: ", data)
  //   }
    
  //   fetchData();

  // },[selectedCategory, pageSize, currentPage])

  
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

  },[selectedCategory, pageSize, currentPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    console.log("Triggered and Category selected: ", selectedCategory)
    setActiveCategory(category);
  }

  return (
    <div className="blogs mb-2">
      {/* //* Category Section */}
      <div>
        <CategorisedBlogs onCategorySelect={handleCategoryChange} selectedCategory={selectedCategory} activeCategory= {activeCategory} blogs={blogs}/>
      </div>

      {/* //*Blog cards Section */}
      <div className="">
        <BlogCards data = {blogs} currentPage={currentPage} selectedCategory={selectedCategory} pageSize={pageSize}/>

      {/* //* Pagination Section */}
      <div className="mt-2">
        <Pagination onPageChange={handlePageChange} currentPage={currentPage} blogs={blogs} pageSize={pageSize}/>
      </div>
    </div>
    </div>
  );
}