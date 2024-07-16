const express = require("express");
const cors = require("cors");
const { connection } = require("./config.js"); //Destructuring
const { feedbackModel } = require("./collections/feedback.js"); //Destructuring
const { pictureModel } = require("./collections/blogPic.js"); //Destructuring
const { blogsModel } = require("./collections/blogs.js"); //Destructuring
const { signupModel } = require("./collections/signup.js"); //Destructuring
// const blogs = require('./api/blogsData.json')
const multer  = require('multer')

const app = express();
const port = 8008;

//* Middleware
app.use(cors()); // cross platform
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // To parse URL-encoded bodies

//* MongoDB connected successfully
connection();

//* APIs

// Homepage
app.get("/", (req, res) => {
  res.send("Blog server is running!");
});

//* Blogs rendered using json file: const blogs = require('./api/blogsData.json')
// app.get('/blogs', (req, res) => {
//   res.send(blogs)
// })

//* Blogs rendering using DB
app.get("/blogs", async (req, res) => {
  await blogsModel
    .find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json("Error = ", err));
});

//* Multer for uploading Pics
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadBlogPics = multer({ storage: myStorage });

app.post('/uploadblogpic', uploadBlogPics.single('image'), async (req, res) => {
  console.log("Uploading pic")
  const picture = new Picture({
    title: req.body.title,
    imagePath: req.file.path
  });
  try {
    const savedPicture = await pictureModel.save();
    res.status(200).json(savedPicture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Blogs rendered by id
app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogsModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
    // res.send(blog);
  } catch (err) {
    res.status(500).json({ message: "Error = " + err.message });
  }
  
  //* Using Json file.
  // const blog = blogs.filter((blog) => blog._id === id);
  // console.log("id:", blog._id);
  // res.send(blog);
  // console.log("id: ",id);
});

//* Saving Contact form in the DB in feedback table.
app.post("/contactus", async (req, res) => {
  // console.log("Contact Us");
  const data = new feedbackModel();
  data.name = req.body.name;
  data.phone = req.body.phone;
  data.msg = req.body.msg;

  const doc = await data.save();
  // console.log("Data saved successfully= ",doc);
  // res.json(doc);
  res.send(doc);
});

//* Saving Login details in Accounts table.
app.post("/signup", async (req, res) => {
  // console.log("Signup");
  const { name, username, email, phone, password } = req.body;  //Destructuring
  if (!name || !username || !email || !phone || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const data = new signupModel({ name, username, email, phone, password });

  try {
    const doc = await data.save();
    // console.log("Data saved successfully: ", doc);
    res.status(201).send(doc);
  } catch (error) {
    // console.error("Error saving data: ", error);
    res.status(400).send({ message: error.message });
  }
});

app.post('/updateviews', async (req, res) => {
  // console.log("Updating Views")
  const blogId = req.body.blogId;
  // console.log("data._id: ", postId)

  try {
    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Post not found' });
    }
    blog.views_count++;
    await blog.save();

    res.json({ message: 'Views count increased successfully' });
  } catch (error) {
    console.error('Error increasing views count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/signin', async (req, res) => {
  
  const { username, password } = req.body;
  // console.log(username, "is username");
  try {
    const blog = await signupModel.find({ username: username });

    if (!blog) {
      console.log("No user found.")
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("blog:", blog);

    if (blog[0].password!== password) {
      // console.log("Password does not match.")
      res.json({ success: false, message: 'Invalid credentials.' });
    }
    else {
      // console.log("Logged in")
      res.json({ success: true, message: 'Login successful!' });
    }
  } 
  catch (error) {
    // console.error('Error in Signin: ', error);
    res.status(500).json({ message: 'User not found. Please Signup' });
  }
})

app.post('/addblog', async (req, res) => {
  const views_count = 0
  const { title, category, author, published_date, reading_time, content, visibility } = req.body;  //Destructuring
  // image, tags, views_count
  if (!title || !category  || !author || !published_date || !reading_time  || !content  || !visibility) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const data = new signupModel({ title, category, author, published_date, reading_time, content, visibility, views_count });

  try {
    const doc = await data.save();
    console.log("Data saved successfully: ", doc);
    res.status(201).send(doc);
  } catch (error) {
    console.error("Error saving data: ", error);
    res.status(400).send({ message: error.message });
  }
  // console.log(blog)
})

app.post('/editblog', async (req, res) => {
  
  const { id,
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
    authorPic, } = req.body;  //Destructuring
  // if (!title || !category  || !author || !published_date || !reading_time  || !content  || !visibility) {
  //   return res.status(400).send({ error: 'All fields are required' });
  // }
  const data = new blogsModel({ title,
    category,
    author,
    published_date,
    reading_time,
    content,
    visibility,
    tags,
    image,
    views_count,
    authorPic, });

  try {
    const updatedBlog = await blogsModel.findByIdAndUpdate(id, {
      title, category, author, published_date, reading_time, content, visibility, tags, image, views_count, authorPic
    }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // console.log(blog)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});