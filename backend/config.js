const mongoose = require("mongoose")
const con_url = "mongodb://127.0.0.1:27017/blog_website";

//* 1. Connection
async function connection() {
    await mongoose
      .connect(con_url)
      .then(() => console.log("MongoDB Connected."))
      .catch(err => console.log("Mongo Error= ",err))
  }

module.exports = {connection};//exported as an object