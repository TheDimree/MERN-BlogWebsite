const mongoose=require('mongoose');

//* 2. Schema
const signupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        password: { 
            type: String,
            required: true, 
        },
    }
  )
  
  //* 3. Modal  
signupModel = mongoose.model("account", signupSchema)  // account is a collection/table name.

module.exports = {signupModel};//exported as an object