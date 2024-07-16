import React from 'react'

export default function CategorisedBlogs({onCategorySelect, selectedCategory, activeCategory, blogs}) {
    
    const categories = blogs.map((blog)=> blog.category).sort();
    // console.log("cat: ", categories)

    return (
    <>
    <div className='mb-4 place-items-center'>
      <button className={activeCategory === null ? "mb-2 relative ml-3 inline-flex items-center rounded-md border bg-red-600 text-white cursor-pointer focus:z-20 focus-visible:outline focus-visible:outline-2 px-4 py-2 text-base focus-visible:outline-offset-2 focus-visible:outline-red-600" : "mb-2 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"} onClick={()=> onCategorySelect(null)}>All</button>
      {categories
      .filter((value, index, array) => index === array.indexOf(value))
        .map((category) => (
          <button key={category} className={activeCategory === category ? "mb-2 relative ml-3 inline-flex items-center rounded-md border bg-red-600 text-white cursor-pointer focus:z-20 focus-visible:outline focus-visible:outline-2 px-4 py-2 text-base focus-visible:outline-offset-2 focus-visible:outline-red-600" : "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"}
          onClick={()=>{onCategorySelect(category)}}
          >{category}
          </button>
        ))}
    </div>
    </>
    )
}