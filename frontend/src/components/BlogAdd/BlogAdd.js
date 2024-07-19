import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";


export default function BlogAdd() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [author, setAuthor] = useState("Select Author");
  const [selectedDate, setSelectedDate] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [content, setContent] = useState("");
  const [authorPic, setAuthorPic] = useState("author1.jpg");
  const [tags, setTags] = useState([]);
  const [inputTags, setInputTags] = useState('');
  const [visibility, setVisibility] = useState('Select Visibility');
  const [views, setViews] = useState(0);

  // const [formData, setFormData] = useState({}) 

  //! Pending 
  const [pic, setPic] = useState('https://techcrunch.com/wp-content/uploads/2015/02/shutterstock_128451140.jpg?w=430&h=230&crop=1');


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
    // getCurrentDate()
    getReadingTime();
  },[category, author, content]);

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
    // console.log(title)
  }
  
  //* Tags functionality
  const handleTagInput = (event) => {
    setInputTags(event.target.value)
    // console.log("inputTags: ", inputTags)
    // console.log("tags:", tags);
  }

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputTags.length>0 && inputTags !== ' ') {
      event.preventDefault() //! When Enter is pressed, event.preventDefault() prevents the default form submission behavior, allowing you to handle adding tags in a controlled manner.   
      // const newTagsAr = inputTags.trim().split(" ");
      const newTagsAr = inputTags.split(" ");
      setTags(tags.concat(newTagsAr));
      setInputTags('')
      // console.log("inputTags keyDown: ", inputTags)
      // console.log("tagsS: keyDown should be empty", tags);
      // event.target.value = '';
    }
  };

  const handleTagDelete = (value) => {
    // console.log("deleting tags", value)
    const updatedTags = tags.filter((v) => v !== value);
    setTags(updatedTags);
    // console.log("Updated tags: ", tags)
  };

  const handleContent = (event) => {
    const getContent = event.target.value;
    setContent(getContent);
    // console.log(content);
  }

  const clearFormData = () => { 
    setTitle("");
    setPic('');
    setReadingTime(0);
    setContent("");
    setTags([]);
    setCategory("Select Category");
    setAuthor("Select Author");
    setVisibility("Select Visibility");
    setViews(0);
  };

  function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear(); // Full year
    
    const formattedDate = `${day}/${month}/${year}`;
    const today = Date.parse(`${day}/${month}/${year}`);
    // console.log(today, "datee")
    // const today = new Date(formattedDate)
    // console.log("type:", typeof(today))
    // setSelectedDate(today);
    // console.log(`${day}/${month}/${year}`)
  }

  const getReadingTime = () => {
    const getTime = (60/300) * content.split(" ").filter((element) => {return element.length!==0}).length
    setReadingTime(getTime);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // console.log('typeofdate: ', typeof(date))
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    

    if (title==='' || category==='Select Category'  || author==='Select Author'  || !selectedDate  || content===''  || visibility==='Select Visibility' || tags.length===0) {
      alert("Please fill all fields");
      return;
    }
      const formData = { //* creating an object from all useStates
        title: title, 
        category: category, 
        author: author, 
        published_date: selectedDate, 
        reading_time: readingTime, 
        content: content, 
        visibility: visibility,
        authorPic: authorPic,
        tags: tags,
        image: 'https://techcrunch.com/wp-content/uploads/2015/02/shutterstock_128451140.jpg?w=430&h=230&crop=1',
        views_count: views
      };
      console.log("FormData to be send:", formData);

      try {
        const response = await fetch("http://localhost:8008/addblog", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Response from Backend: ", data);
        clearFormData();
      } catch (error) {
        console.error("Error:", error);
      }
  };

  return (
    <div className="w-1/2   mx-auto my-12 container mb-40">
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
        
        {/* //* Tags functionality. */}
        <div className="form-group mb-4">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full"
            value={inputTags}
            id="tags"
            name="tags"
            onChange={handleTagInput}
            onKeyDown={handleInputKeyDown}
            placeholder="Enter tags separated by space and press Enter"
          />
          {/* {tagsS.map((obj, index)=> (
            <span key={index}>{obj}</span>
            ))} */}
          <div className="mt-2">
            {tags.map((value, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 m-1 bg-gray-200 rounded text-sm"
              >
                {value}
                <button
                  onClick={()=> handleTagDelete(value)}
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
            value={views}
            id="views"
            name="views"
            onChange={(event) => {
              setViews(event.target.value);
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
              {readingTime < 60
                ? `${readingTime} minutes`
                : `${Math.floor(readingTime/60)} hours`}
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