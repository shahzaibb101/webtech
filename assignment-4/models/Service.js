const mongoose = require("mongoose");

// Defining User schema
const userSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true
    }, 
    title: {
      type: String,
      required: true
    }, 
    explain: {
      type: String,
      required: true
    }, 
    price: {
      type: Number,
      required: true
    }, 
    url: {
      type: String,
      required: true
    }
})

// Defining User model
const monmodel = mongoose.model('Service', userSchema);

module.exports = monmodel;