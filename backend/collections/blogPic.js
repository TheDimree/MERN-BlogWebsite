const mongoose=require('mongoose');

//* 2. Schema
const pictureSchema = new mongoose.Schema({
    title: String,
    imagePath: String
  });

  //* 3. Modal  
const pictureModel = mongoose.model('Picture', pictureSchema);  // feedback is a collection/table name.

module.exports = {pictureModel};//exported as an object