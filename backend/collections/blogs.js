const mongoose=require('mongoose');

//* 2. Schema
const blogsSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true, 
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        authorPic: {
            type: String,
            required: true,
        },
        published_date: {
            type: Date,
            required: true,
        },
        reading_time: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        visibility: {
            type: String,
            required: true,
        },
        views_count: {
            type: Number,
            required: true,
        },
    }
  )
  
  //* 3. Modal
  blogsModel = mongoose.model("blogs", blogsSchema)  // feedback is a collection/table name.

  module.exports = {blogsModel};//exported as an object