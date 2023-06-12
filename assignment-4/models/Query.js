const mongoose = require("mongoose");

// Defining User schema
const userSchema = new mongoose.Schema({
    uname: {
      type: String,
      required: true
    }, 
    query: {
      type: String,
      required: true
    }
})

// Defining User model
const monmodel = mongoose.model('Query', userSchema);

module.exports = monmodel;