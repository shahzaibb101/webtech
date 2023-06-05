const mongoose = require("mongoose");

const food = new mongoose.Schema({
    type: {
      type: String,
      required: true
    }, 
    name: {
      type: String,
      required: true
    }, 
    calories: {
      type: Number,
      required: true
    }
})

const monmodel = mongoose.model('Foods', food);

module.exports = monmodel;