import React, { useEffect, useState } from "react";
import axios from 'axios';
// import {Route, Routes} from "react-router";
// import './App.css';

import ContactPage from './pages/ContactPage.js';
import HomePage from './pages/HomePage.js';
 import BlogsPage from './pages/BlogsPage.js';
import BlogsSearch from './components/BlogsSearch/BlogsSearch.js';
import AdminPage from './pages/AdminPage.js';
import BlogEditPage from './pages/BlogEditPage.js';
import BlogAddPage from './pages/BlogAddPage.js';
import BlogDetailPage from './pages/BlogDetailPage.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';
import Admin from "./components/Admin/Admin.js";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLoaderData,
  // Route, Link,
} from "react-router-dom";


// Defining the loader function above the component for Blog Edit route.
const blogEditLoader = async ({ params }) => {
  const blog = fetch(`http://localhost:8008/blogs/${params.id}`);
  const blogs = fetch(`http://localhost:8008/blogs`);

  const [blogData, blogsData] = await Promise.all([blog, blogs]);

  if (!blogData.ok || !blogsData.ok) {
    throw new Error('Failed to fetch data');
  }

  const blogJson = await blogData.json();
  const anotherJson = await blogsData.json();

  return { blog: blogJson, blogs: anotherJson };
};



const router = createBrowserRouter([
  
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/contact",
    element: <ContactPage/>,
  },
  {
    path: "/blogs",
    element: <BlogsPage />,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetailPage/>,
    loader: ({params}) => fetch(`http://localhost:8008/blogs/${params.id}`) //loader f(x) allows you to fetch the necessary data before the component is rendered. 
  },
  {
    path: "/search",
    element: <BlogsSearch/>,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    loader: () => fetch(`http://localhost:8008/blogs`)

  },
  {
    path: "/blogedit/:id",
    element: <BlogEditPage />,
    loader: blogEditLoader,
  },
  {
    path: "/newblog",
    element: <BlogAddPage />,
    loader: () => fetch(`http://localhost:8008/blogs`) 
  },
  {
    path: "/signin",
    element: <Signin/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
]);

export default function App() {

  return (
    <div className="App">
      
      <RouterProvider router={router} />
      
      {/* <Routes>
        {/* <Route path= "/" element= {<HomePage blogs={blogs} setCurrentPage={setCurrentPage} selectedCategory={selectedCategory} categoryBlogs={categoryBlogs} activeCategory={activeCategory} />}/> */}
        {/* <Route path= "/" element= {<HomePage />}/>
        <Route path= "/contact" element= {<ContactPage />}/>
        <Route path= "/blogs" element= {<BlogsPage />}/>
        <Route path= "/blogs/:id" element= {<BlogDetailPage />}/>
        <Route path= "/search" element= {<BlogsSearch />}/>
        <Route path= "/admin" element= {<AdminPage />}/>
        <Route path= "/blogedit/:id" element= {<BlogEditPage />}/>
        <Route path= "/newblog" element= {<BlogAddPage />}/>
        <Route path= "/signin" element= {<Signin />}/>
        <Route path= "/signup" element= {<Signup />}/>
      </Routes> */}
    </div>
  );
}

// export default App;