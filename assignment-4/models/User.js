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
    role: {
      type: String,
      required: true
    }, 
    about: {
      type: String
    }, 
    main: {
      type: String
    },
    profile_pic: {
      type: String
    }
})

// Defining User model
const monmodel = mongoose.model('User', userSchema);

module.exports = monmodel;