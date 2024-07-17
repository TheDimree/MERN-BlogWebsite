import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
// import { FaClock, FaUser } from 'react-icons/fa';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

export default function BlogEdit() {
  const { blog, blogs } = useLoaderData();
  // console.log("blog: ", blog, "\nblogs: ", blogs)
  const {
    _id,
    title,
    category,
    author,
    published_date,
    reading_time,
    content,
    visibility,
    tags,
    image,
    views_count,
    authorPic,
  } = blog;

  // const navigate = useNavigate(); //* route to admin page after editing the blog.

  const [titleS, setTitleS] = useState("");
  const [categoryS, setCategoryS] = useState("Select Category");
  const [authorS, setAuthorS] = useState("Select Author");
  const [selectedDate, setSelectedDate] = useState(null);
  const [readingTimeS, setReadingTimeS] = useState(0);
  const [contentS, setContentS] = useState("");
  const [visibilityS, setVisibilityS] = useState("Select Visibility");
  const [authorPicS, setAuthorPicS] = useState("");
  const [viewsS, setViewsS] = useState(0);

  //* pending functionality
  const [tagsS, setTagsS] = useState([]);
  const [inputTagsS, setInputTagsS] = useState('');
  const [imageS, setImageS] = useState(null); //* change image pending

  const [uniqueSortedCategories, setUniqueSortedCategories] = useState([]);
  const [uniqueSortedAuthors, setUniqueSortedAuthors] = useState([]);

  const uniqueFunction = (parameter, setter) => {
    const filtering = blogs
      .filter((blog, index, self) => {
        return (
          index === self.findIndex((t) => t[parameter] === blog[parameter])
        ); //dynamic access
      })
      .map((obj, i, objArr) => obj[parameter])
      .sort();
    setter(filtering);
  };

  useEffect(() => {
    setTitleS(title);
    setCategoryS(category);
    setAuthorS(author);
    setSelectedDate(published_date);
    setContentS(content);
    setVisibilityS(visibility);
    setViewsS(views_count);
    setAuthorPicS("author1.jpg");
    setImageS(image);

    getReadingTime(); // updating reading time
    // console.log("called")
    setTagsS(tags);

    uniqueFunction("category", setUniqueSortedCategories);
    uniqueFunction("author", setUniqueSortedAuthors);
    // getCurrentDate()
  }, []);

  

  const handleCategorySelect = (category) => {
    setCategoryS(category);
  };
  const handleAuthorSelect = (author) => {
    setAuthorS(author);
  };

  const handleVisibilitySelect = (visibility) => {
    setVisibilityS(visibility);
  };

  const handleTitle = (event) => {
    const getTitle = event.target.value;
    setTitleS(getTitle);
    console.log("title", titleS);
  };

  //* Tags functionality
  const handleTagInput = (event) => {
    setInputTagsS(event.target.value)
    console.log("inputTagsS: ", inputTagsS)
    console.log("tags:", tagsS);
  }

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputTagsS.trim().length>0) {
      const newTagsAr = inputTagsS.trim().split(" ");
      setTagsS(tagsS.concat(newTagsAr));
      setInputTagsS('')
      // event.target.value = '';
    }
  };

  const handleTagDelete = (index) => {
    console.log("deleting tags")
    const updatedTags = tagsS.filter((_, i) => i !== index);
    setTagsS(updatedTags);
    console.log("Updated tags: ", tagsS)
  };

  

  //* Content functionality
  const handleContent = (event) => {
    const getContent = event.target.value;
    setContentS(getContent);
    // console.log(content);
    getReadingTime();
  };

  //* Date functionality
  // function getCurrentDate() {
  //   const date = new Date();
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  //   const year = date.getFullYear(); // Full year
  //   setSelectedDate(`${day}/${month}/${year}`);
  // }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const getReadingTime = () => {
    // 300 words per minute.
    const getTime =
      (60 / 300) *
      contentS.split(" ").filter((element) => element.length !== 0).length;
    setReadingTimeS(getTime);
    // console.log("got time updated", getTime);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    getReadingTime();
    const formData = {      //* creating an object from all useStates
      id: _id,
      title: titleS,
      image: imageS,
      category: categoryS,
      author: authorS,
      authorPic: authorPicS,
      published_date: selectedDate,
      reading_time: readingTimeS,
      content: contentS,
      tags: tagsS,
      visibility: visibilityS,
      views_count: viewsS,
    }
    // console.log("formData to be send:", formData);

    try {
      const response = await fetch("http://localhost:8008/editblog", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const msg = await response.json();
      // console.log(msg);
      // navigate('/admin');

    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="w-1/2   mx-auto my-12 container mb-40">
      <form method="POST" action="/editblog" onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            value={titleS}
            id="title"
            name="title"
            onChange={handleTitle}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control mb-2"
            id="content"
            name="content"
            value={contentS}
            rows="9"
            onChange={handleContent}
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-medium mb-2"
          >
            Published Date
          </label>
          <DatePicker
            id="date"
            name="date"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="form-control mb-2 p-2 border border-gray-300 rounded w-full"
            calendarClassName="react-datepicker"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="category">Category</label>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 ml-5 hover:bg-gray-50">
                {categoryS}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none overflow-y-auto max-h-60"
            >
              {uniqueSortedCategories.map((obj, i) => (
                <div className="py-1" key={i}>
                  <MenuItem>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                      onClick={() => handleCategorySelect(obj)}
                    >
                      {obj}
                    </div>
                  </MenuItem>
                </div>
              ))}
            </MenuItems>
          </Menu>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="author">Author</label>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ml-9 ring-gray-300 hover:bg-gray-50">
                {authorS}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in overflow-y-auto max-h-60"
              name="author"
            >
              {uniqueSortedAuthors.map((obj, i) => (
                <div className="py-1" key={i}>
                  <MenuItem>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                      onClick={() => handleAuthorSelect(obj)}
                    >
                      {obj}
                    </div>
                  </MenuItem>
                </div>
              ))}
            </MenuItems>
          </Menu>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="visibility">Visibility</label>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ml-7 ring-gray-300 hover:bg-gray-50">
                {visibilityS}

                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in overflow-y-auto max-h-60"
              name="author"
            >
              <div className="py-1">
                <MenuItem>
                  {() => (
                    <div
                      className={`block px-4 py-2 text-sm text-gray-700`}
                      onClick={() => handleVisibilitySelect("Public")}
                    >
                      Public
                    </div>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <div
                      onClick={() => handleVisibilitySelect("Private")}
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? "bg-gray-100 text-gray-900" : ""
                      }`}
                    >
                      Private
                    </div>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            Blog Image
          </label>
          <img
            src={imageS}
            alt="Description"
            className="form-control mb-2 p-2 border border-gray-300 rounded w-full"
            id="image"
          />
        </div>

        {/* //* Uploading Pic using Multer-middleware */}
        <div className="form-group mb-4">
          <label htmlFor="file" className="mr-2">
            Blog Pic
          </label>
          <form action="/uploadblogpic" method="POST" enctype="multipart/form-data">
            <input type="file" name="blogPic" />
            <button type="submit" className="btn dark-btn btn-success">Change</button>
          </form>
        </div>

        {/* //* Tags functionality pending. */}
        <div className="form-group mb-4">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full"
            value={inputTagsS}
            id="tags"
            name="tags"
            onChange={handleTagInput}
            onKeyDown={handleInputKeyDown}
            placeholder="Enter tags separated by space and press Enter"
          />
          <div className="mt-2">
            {tagsS.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 m-1 bg-gray-200 rounded text-sm"
              >
                {tags}
                <button
                  onClick={() => handleTagDelete(index)}
                  className="ml-2 text-red-500"
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="views">Views</label>
          <input
            type="number"
            className="form-control"
            value={viewsS}
            id="views"
            name="views"
            onChange={(event) => {
              setViewsS(event.target.value);
            }}
          />
        </div>
        <div className="form-group mb-4">
          <label
            htmlFor="reading_time"
            className="block text-gray-700 font-medium mb-2"
          >
            Reading Time
          </label>
          <div className="flex items-center mb-2">
            <span className="mx-2">
              {readingTimeS < 60
                ? `${readingTimeS} minutes`
                : `{${readingTimeS}/ 60} hours`}
            </span>
            {/* <button
              type="button"
              className="p-2 border border-gray-300 rounded bg-blue-500 text-white font-medium"
              onClick={()=> getReadingTime()}
            >
              Update
            </button> */}
          </div>
        </div>

        <button type="submit" className="btn dark-btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
