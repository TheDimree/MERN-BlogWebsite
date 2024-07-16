import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useLoaderData } from "react-router-dom";

export default function BlogAdd() {
  const [title, setTitle] = useState("");
  // const [pic, setPic] = useState(null);
  const [category, setCategory] = useState("Select Category");
  const [author, setAuthor] = useState("Select Author");
  const [date, setDate] = useState('');
  const [readingTime, setReadingTime] = useState(0);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [visibility, setVisibility] = useState('Select Visibility');
  // const [views, setViews] = useState(0);
  const [formData, setFormData] = useState({}) 

  const [uniqueSortedCategories, setUniqueSortedCategories] = useState([]);
  const [uniqueSortedAuthors, setUniqueSortedAuthors] = useState([]);

  const blogs = useLoaderData();
  // console.log("blogs", blogs)

  const uniqueFunction = (parameter, setter) => {
    const filtering = blogs.filter((blog, index, self) => {
      return index === self.findIndex((t) => (t[parameter] === blog[parameter]))  //dynamic access
    }).map((obj, i, objArr)=> obj[parameter]).sort()
    setter(filtering)
  }

  useEffect(()=> {
    uniqueFunction("category", setUniqueSortedCategories)
    uniqueFunction('author', setUniqueSortedAuthors)
    getCurrentDate()
    getReadingTime();
  },[blogs]);

  const handleCategorySelect = (category) => {
    setCategory(category);
  };
  const handleAuthorSelect = (author) => {
    setAuthor(author);
  };
  
  const handleVisibilitySelect = (visibility) => {
    setVisibility(visibility);
  };
  
  const handleTitle = (event) => {
    const getTitle = event.target.value;
    setTitle(getTitle);
    console.log(title)
  }
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleContent = (event) => {
    const getContent = event.target.value;
    setContent(getContent);
    console.log(content);
  }

  const clearFormData = () => { 
    setTitle("");
    // setPic(null);
    // setDate("");
    setReadingTime(0);
    setContent("");
    // setTags([]);
    setCategory("Select Category");
    setAuthor("Select Author");
    setVisibility("Select Visibility");
    // setViews(0);
  };

  function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear(); // Full year
    setDate(`${day}/${month}/${year}`);
  }
  const getReadingTime = () => {
    const getTime = (60/300) * content.split(" ").filter((element) => {return element.length!==0}).length
    setReadingTime(getTime);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    if (!title || !category  || !author  || !date  || !readingTime  || !content  || !visibility) {
      setFormData({ //* creating an object from all useStates
        title: title, 
        category: category, 
        author: author, 
        published_date: date, 
        reading_time: readingTime, 
        content: content, 
        visibility: visibility,
      });

      try {
        const response = await fetch("http://localhost:8008/addblog", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        clearFormData();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="w-1/2   mx-auto my-12 container mb-40">
      {tags.map((obj, i) => 
      tags
      )}
      <form method="POST" action="/addblog" onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" value={title} id="title" name="title" onChange={handleTitle} />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control mb-2"
            id="content"
            name="content"
            value={content}
            rows="3"
            onChange={handleContent}
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="category">Category</label>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 ml-5 hover:bg-gray-50">
                {category}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
              {uniqueSortedCategories.map((obj, i)=> (<div className="py-1" key={i}><MenuItem>
                <div className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900" onClick={()=>handleCategorySelect(obj)}>
                  {obj}
                </div>
              </MenuItem></div>))
              }
            </MenuItems>
          </Menu>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="author">Author</label>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ml-9 ring-gray-300 hover:bg-gray-50">
                {author}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in" name='author'>
              {uniqueSortedAuthors.map((obj, i)=> (<div className="py-1" key={i}><MenuItem>
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
                {visibility}

                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in" name='author'>
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
        <div className="form-group mb-4">
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
        </div>

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
