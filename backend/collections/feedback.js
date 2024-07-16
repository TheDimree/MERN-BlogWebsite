const mongoose=require('mongoose');

//* 2. Schema
const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: { 
            type: Number,
            required: true, 
        },
        msg: String,
    }
  )
  
  //* 3. Modal  
feedbackModel = mongoose.model("feedback", feedbackSchema)  // feedback is a collection/table name.

module.exports = {feedbackModel};//exported as an object