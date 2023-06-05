const mongoose = require("mongoose");

// Defining User schema
const userSchema = new mongoose.Schema({
    uname: {
      type: String,
      unique: true,
      required: true
    }, 
    email: {
      type: String,
      unique: true,
      required: true
    }, 
    phno: {
      type: Number,
      required: true
    }, 
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
})

// Defining User model
const monmodel = mongoose.model('User', userSchema);

module.exports = monmodel;