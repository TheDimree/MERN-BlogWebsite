const express = require("express");
const cors = require("cors");
const { connection } = require("./config.js"); //Destructuring
const { feedbackModel } = require("./collections/feedback.js"); //Destructuring
// const { pictureModel } = require("./collections/blogPic.js"); //Destructuring
const { blogsModel } = require("./collections/blogs.js"); //Destructuring
const { signupModel } = require("./collections/signup.js"); //Destructuring
// const blogs = require('./api/blogsData.json')
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "dunhill"; //jw token key.
const cookieParser = require('cookie-parser') //middleware
const nodemailer = require("nodemailer");
// require("dotenv").config();



const app = express();
const port = 8008;

//* Middleware
app.use(cors())  // cross platform
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // To parse URL-encoded bodies
app.use(cookieParser())

//* MongoDB connected successfully
connection();

//* APIs

// Homepage
app.get("/", (req, res) => {
  res.send("Blog server is running!");
});

//* Multer for uploading Pics
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: myStorage }); // OR  upload = multer({ myStorage })

// app.post("/blogimg", upload.single("blogPic"), (req, res) => {
//   try {
//     console.log(req.file);
//     console.log("Uploaded pic.");
//     // const picture = new Picture({
//     //   title: req.body.title,
//     //   imagePath: req.file.path
//     // });
//     // try {
//     //   const savedPicture = await pictureModel.save();
//     //   res.status(202).json(savedPicture);
//     // } catch (error) {
//     //   res.status(404).json({ msg: error.message });
//     // }
//   } catch (error) {
//     console.log("Error uploading the file", error);
//     res.status(404).json({ msg: error.message });
//   }
// });

//* Blogs rendered using json file: const blogs = require('./api/blogsData.json')
// app.get('/blogs', (req, res) => {
//   res.send(blogs)
// })

//* Blogs rendering using DB
app.get("/blogs", async (req, res) => {
  const { search } = req.query;
  // console.log("search:", search);
  try {
    let blogs;
    if (search) {
      blogs = await blogsModel.find({
        $or: [
          { title: new RegExp(search, "i") },
          { content: new RegExp(search, "i") },
        ],
      });
      console.log("blogs:", blogs);
    } else {
      blogs = await blogsModel.find();
    }
    res.status(202).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, msg: `Error occurred: ${error.message}` });
  }

  // await blogsModel
  //   .find()
  //   .then((blogs) => res.json(blogs))
  //   .catch((err) => res.json("Error = ", err));
});

// Blogs rendered by id
app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogsModel.findById(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
    // res.send(blog);
  } catch (err) {
    res.status(505).json({ msg: "Error = " + err.message });
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

app.post("/updateviews", async (req, res) => {
  // console.log("Updating Views")
  const blogId = req.body.blogId;
  // console.log("data._id: ", postId)

  try {
    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Post not found" });
    }
    blog.views_count++;
    await blog.save();

    res.json({ msg: "Views count increased successfully" });
  } catch (error) {
    console.error("Error increasing views count:", error);
    res.status(505).json({ error: "Internal server error" });
  }
});

//* Saving Login details in Accounts table.
app.post("/signup", async (req, res) => {
  // console.log("Signup");
  const { name, username, email, phone, password } = req.body; //Destructuring

  if (!name || !username || !email || !phone || !password) {
    return res.status(404).send({ error: "All fields are required" });
  }

  //* Checking if the user already exist with the same username.
  const existingUser = await signupModel.find({ username });

  if (existingUser) {
    return res.status(404).json({ msg: "Username already exists" });
  }

  if (!user) {
    console.log("No user found.");
    return res.status(404).json({ msg: "User not found" });
  }


  //* Hashing password
  const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed
  // console.log("hashedPassword: ", hashedPassword);

  const user = new signupModel({
    name,
    username,
    email,
    phone,
    password: hashedPassword,
  });

  try {
    const doc = await user.save();
    res.status(202).send({ msg: "User registered successfully." });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }

  const obj = {
    id: user._id,
    username: user.username,
  };

  let token;
  try {
    token = jwt.sign(obj, secretKey, { expiresIn: "1h" });  //JWT Token Creation
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res
    .status(202)
    .json({
      success: true,
      data: { id: user._id, username: user.username, token: token },
    });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  // console.log("password: ", password)
  // console.log(username, "is username");
  try {
    const user = await signupModel.findOne({ username: username });
    console.log("user: ", user);

    if (!user) {
      console.log("No user found.");
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    //checking and decrypting password to login.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("Password Matched:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Password does not match.");
      return res.status(404).json({ success: false, msg: "Invalid credentials." });
    }

    let token;

    //Creating jwt token
    const tokenPayload = {
      id: user._id,
      username: user.username,
    };

    token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });  //JWT Token Creation.
    console.log("token: ", token);

    //cookie section
    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  // 3 days => day * hour * minute * seconds * milliseconds
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie.
      secure: process.env.NODE_ENV === 'production', // Set to true if you're using HTTPS
      sameSite: 'strict', // or 'lax' depending on your requirements
    };

    // Send the response with the token in a cookie
    res.status(202).cookie("token", token, cookieOptions).json({
      success: true, data: { id: user._id, username: user.username, token: token }, msg: "Login successfully.",
    })
  } catch (error) {
    res.status(505).json({ success: false, msg: `Error occurred: ${error}` });
  }
});

app.get("/accessResource", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res.status(202).json({
      success: false,
      msg: "Error!Token was not provided.",
    });
  }
  //Decoding the token
  try {
    const decodedToken = jwt.verify(token, secretKey);
    res.status(202).json({
      success: true,
      data: {
        id: decodedToken.id,
        username: decodedToken.username,
      },
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: "Error! Token is invalid.",
    });
  }
});

app.post("/editblog", async (req, res) => {
  const {
    id,
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
  } = req.body; //Destructuring
  // if (!title || !category  || !author || !published_date || !reading_time  || !content  || !visibility) {
  //   return res.status(404).send({ error: 'All fields are required' });
  // }
  const data = new blogsModel({
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
  });

  try {
    const blog = await blogsModel.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Post not found" });
    }

    blog.title = title;
    blog.image = image;
    blog.category = category;
    blog.author = author;
    blog.authorPic = authorPic;
    blog.published_date = published_date;
    blog.reading_time = reading_time;
    blog.content = content;
    blog.tags = tags;
    blog.visibility = visibility;
    blog.views_count = views_count;

    await blog.save();
    res.json({ msg: "Blog updated successfully" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

app.delete("/deleteblog/:id", async (req, res) => {
  const { id } = req.params
  try {
    const result = await blogsModel.findByIdAndDelete(id)
    if (result) {
      res.status(202).json({ success: true, msg: 'Blog post deleted successfully' });
    } else {
      res.status(404).json({ success: false, msg: 'Blog post not found' });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

app.post("/addblog", async (req, res) => {
  const {
    title,
    category,
    author,
    published_date,
    reading_time,
    image,
    content,
    visibility,
    authorPic,
    tags,
    views_count,
  } = req.body; //Destructuring

  const formData = {
    //* creating an object from all useStates
    title: title,
    category: category,
    author: author,
    published_date: published_date,
    reading_time: reading_time,
    content: content,
    visibility: visibility,
    authorPic: authorPic,
    tags: tags,
    image: image,
    views_count: views_count,
  };
  console.log("formData: ", formData);

  if (
    title === "" ||
    category === "Select Category" ||
    author === "Select Author" ||
    !published_date ||
    content === "" ||
    visibility === "Select Visibility" ||
    tags.length === 0
  ) {
    return res.status(404).send({ msg: "All fields are required" });
  }

  const data = new blogsModel({
    title,
    category,
    author,
    published_date,
    reading_time,
    image,
    content,
    visibility,
    authorPic,
    tags,
    views_count,
  });

  try {
    const doc = await data.save();
    console.log("Data saved successfully: ", doc);
    res.status(202).send({ msg: "Data saved successfully." });
  } catch (error) {
    console.error("Error saving data: ", error);
    res.status(404).send({ msg: error.message });
  }
});

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

app.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
