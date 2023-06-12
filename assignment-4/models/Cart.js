const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true
    }, 
    seller_id: {
      type: String,
      required: true
    }, 
    service_title: {
      type: String,
      required: true
    }, 
    service_detail: {
        type: String,
        required: true
    },
    service_price: {
      type: Number,
      required: true
    },
    service_url: {
        type: String,
        required: true
    }
})

const cart = mongoose.model('Cart', userSchema);

module.exports = cart;