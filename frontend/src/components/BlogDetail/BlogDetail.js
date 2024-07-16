import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { FaClock, FaUser } from 'react-icons/fa';
import view_count_icon from "../../assets/view_count-icon.png"
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8008'; // Replace with your backend URL

export default function BlogDetail() {
    // const { id } = useParams(); // Getting the `id` from the route parameters if I'd not used loader() and would fetch = await fetch(`http://localhost:8008/blogs/${id}`);
 
    const blog = useLoaderData();
    // if (!blog) {
    //   return <div>Loading...</div>;
    // }
    

    const {_id, title, image, author, published_date, reading_time, content, views_count} = blog;
    
  //   const increaseViews = async () => {
  //   try {
  //     await axios.post('/updateviews', { postId: _id });
  //     console.log('View count increased');
  //   } catch (error) {
  //     console.error('Error increasing view count:', error);
  //   }
  // };

  useEffect(() => {
    const increaseViews = async () => {
      try {
        await axios.post('/updateviews', { blogId: _id });
        console.log('View count increased');
      } catch (error) {
        console.error('Error increasing view count:', error);
      }
    };
    increaseViews();
  }, [_id]);


  return (
    <div>
    
      {/* <div className='py-40 bg-black text-center text-white px-4'>
        <h2 className='text-5xl lg:text 7xl leading-snug front-bold mb-5 '>Single Blog Page</h2>
      </div> */}
      
      {/* Blog Detail  */}

      <div className='max-w-7xl mx-auto my-12 '>
        <div className='lg:w-3/4 mx-auto'>
          <div>
            <img src={image} alt="" className='w-300 mx-auto rounded'/>
          </div>
          <h2 className='text-3xl font-bold mt-8 mb-4 text-blue-500 cursor-pointer'>{title}</h2>
          <p className='mb-3 text-gray-600 text-left'><FaUser className='inline-flex item-center mr-2'/>{author} | {published_date}</p>
          <p className='mb-3 text-gray-600  text-left'><FaClock className='inline-flex item-center mr-2'/>{reading_time}</p>
          <p className='mb-3 text-gray-600  text-left'><img className='inline-flex item-center mr-2' alt= "views icon" src={view_count_icon} width='18px'/>{views_count+1}</p>
          <p className='text-left text-base text-gray-500 mb-6'>{content}</p>
          <div className='text-left text-base text-gray-500 mb-6'> 
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab, provident asperiores distinctio, repellendus animi, placeat aperiam accusamus voluptate fuga architecto explicabo veritatis suscipit. Quis facere ab officia, omnis, porro ullam quasi maiores deserunt excepturi nihil alias delectus quisquam nobis tempora nesciunt possimus pariatur asperiores. Labore doloremque accusantium natus voluptas.</p><br></br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab, provident asperiores distinctio, repellendus animi, placeat aperiam accusamus voluptate fuga architecto explicabo veritatis suscipit. Quis facere ab officia, omnis, porro ullam quasi maiores deserunt excepturi nihil alias delectus quisquam nobis tempora nesciunt possimus pariatur asperiores. Labore doloremque accusantium natus voluptas.</p><br></br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab, provident asperiores distinctio, repellendus animi, placeat aperiam accusamus voluptate fuga architecto explicabo veritatis suscipit. Quis facere ab officia, omnis, porro ullam quasi maiores deserunt excepturi nihil alias delectus quisquam nobis tempora nesciunt possimus pariatur asperiores. Labore doloremque accusantium natus voluptas.</p><br></br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab, provident asperiores distinctio, repellendus animi, placeat aperiam accusamus voluptate fuga architecto explicabo veritatis suscipit. Quis facere ab officia, omnis, porro ullam quasi maiores deserunt excepturi nihil alias delectus quisquam nobis tempora nesciunt possimus pariatur asperiores. Labore doloremque accusantium natus voluptas.</p><br></br>
          </div>
        </div>
      </div>
    </div>
  )
}
