import React, { useEffect, useState } from "react";
import { useLoaderData } from 'react-router-dom'
// import { FaClock, FaUser } from 'react-icons/fa';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

export default function BlogEdit() {

  //Checking commit by adding comment.
  const { blog, blogs } = useLoaderData();
  // console.log("blog: ", blog, "\nblogs: ", blogs)
  const { title, category, author, published_date, reading_time, content, visibility } = blog;

  const [titleS, setTitleS] = useState('');
  // const [pic, setPic] = useState(null);
  const [categoryS, setCategoryS] = useState('Select Category');
  const [authorS, setAuthorS] = useState('Select Author');
  const [dateS, setDateS] = useState('');
  // const [selectedDate, setSelectedDate] = useState(null);
  const [readingTimeS, setReadingTimeS] = useState(0);
  const [contentS, setContentS] = useState('');
  // const [tagsS, setTagsS] = useState([]);
  // const [inputValue, setInputValue] = useState('');
  const [visibilityS, setVisibilityS] = useState('Select Visibility');
  // const [views, setViews] = useState(getViews);

  const [formData, setFormData] = useState({})

  const [uniqueSortedCategories, setUniqueSortedCategories] = useState([]);
  const [uniqueSortedAuthors, setUniqueSortedAuthors] = useState([]);

  const uniqueFunction = (parameter, setter) => {
    const filtering = blogs.filter((blog, index, self) => {
      return index === self.findIndex((t) => (t[parameter] === blog[parameter]))  //dynamic access
    }).map((obj, i, objArr) => obj[parameter]).sort()
    setter(filtering)
  }

  useEffect(() => {
    setTitleS(title)
    setCategoryS(category)
    setAuthorS(author)
    setDateS(published_date)
    setReadingTimeS(reading_time)
    setContentS(content)
    setVisibilityS(visibility)
    uniqueFunction("category", setUniqueSortedCategories)
    uniqueFunction('author', setUniqueSortedAuthors)
    getCurrentDate()
    getReadingTime();
  }, [blogs, title, category, author, published_date, reading_time, content, visibility]);

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
    console.log(title)
  }

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // const handleInputKeyDown = (event) => {
  //   if (event.key === 'Enter' && inputValue.trim()) {
  //     setTags([...tags, inputValue.trim()]);
  //     setInputValue('');
  //   }
  // };

  // const handleTagDelete = (index) => {
  //   setTags(tags.filter((_, i) => i !== index));
  // };

  const handleContent = (event) => {
    const getContent = event.target.value;
    setContentS(getContent);
    console.log(content);
  }

  // const clearFormData = () => { 
  //   setTitleS("");
  //   // setPic(null);
  //   // setDateS("");
  //   setReadingTimeS(0);
  //   setContentS("");
  //   // setTags([]);
  //   setCategoryS("Select Category");
  //   setAuthorS("Select Author");
  //   setVisibilityS("Select Visibility");
  //   // setViews(0);
  // };

  function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear(); // Full year
    setDateS(`${day}/${month}/${year}`);
  }

  const handleDateChange = (date) => {
    // setSelectedDate(date);
  }
  const getReadingTime = () => {
    // const getTime = (60/300) * content.split(" ").filter((element) => {return element.length!==0}).length
    // setReadingTimeS(getTime);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!titleS || !categoryS || !authorS || !dateS || !readingTimeS || !contentS || !visibilityS) {
      setFormData({ //* creating an object from all useStates
        title: titleS,
        category: categoryS,
        author: authorS,
        content: contentS,
        visibility: visibilityS,
        // published_date: dateS,
        reading_time: readingTimeS,
      });

      try {
        const response = await fetch("http://localhost:8008/editblog", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // clearFormData();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className="w-1/2   mx-auto my-12 container mb-40">
      {/* {tags.map((obj, i) => 
      tags
      )} */}
      <form method="POST" action="/addblog" onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" value={titleS} id="title" name="title" onChange={handleTitle} />
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

        {/* <div className="form-group mb-4">
          <label htmlFor="date">Published Date</label>
          <DatePicker
            id="date"
            name="date"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="DD/MM/YYYY"
            className="form-control mb-2 p-2 border border-gray-300 rounded"
            calendarClassName="react-datepicker"
          ></DatePicker>
        </div> */}

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
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none overflow-y-auto max-h-60">
              {uniqueSortedCategories.map((obj, i) => (
                <div className="py-1" key={i}>
                  <MenuItem>
                    <div className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900" onClick={() => handleCategorySelect(obj)}>
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
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in overflow-y-auto max-h-60" name='author'>
              {uniqueSortedAuthors.map((obj, i) => (<div className="py-1" key={i}><MenuItem>
                <div className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900" onClick={() => handleAuthorSelect(obj)}>
                  {obj}
                </div>
              </MenuItem></div>))
              }
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
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in overflow-y-auto max-h-60" name='author'>
              <div className="py-1"><MenuItem>
                {() => (
                  <div
                    className={`block px-4 py-2 text-sm text-gray-700`} onClick={() => handleVisibilitySelect('Public')}
                  >
                    Public
                  </div>
                )}
              </MenuItem></div>
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <div
                      onClick={() => handleVisibilitySelect('Private')}
                      className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100 text-gray-900' : ''}`}
                    >
                      Private
                    </div>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        {/* <div className="form-group mb-4">
          <label htmlFor="tags">Tags</label>
          <input type="text" className="form-control" value={inputValue} id="tags" name="tags"  onChange={handleInputChange} onKeyDown={handleInputKeyDown} placeholder="Enter tags and press Enter" />
          <div>Tags
            {tags.map((tag, index) => (
            <span key={index} style={{ display: 'inline-block', padding: '5px', margin: '5px', background: '#e0e0e0', borderRadius: '3px' }}>
              {tag}
            <button onClick={() => handleTagDelete(index)} style={{ marginLeft: '5px' }}>x</button>
            </span>
            ))}
          </div>
        </div> */}

        {/* <div className="form-group mb-4">
          <label htmlFor="file" className="mr-2">
            Blog Pic
          </label>
          <form action="/uploadblogpic" method="post" enctype="multipart/form-data">
            <input type="file" name="blogPic" />
            <button type="submit" className="btn dark-btn btn-success">Upload</button>
          </form>
        </div> */}

        <button type="submit" className="btn dark-btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
