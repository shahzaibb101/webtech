const express = require("express");
const app = express.Router();
let carts = require("../models/Cart");

app.use(require("../middlewares/checkSession"));

app.get('/delete-cart', async (req,res) => {
    console.log("delete")
    // console.log(req.query.product_id);
    try {
      const deletedUser = await carts.findOneAndDelete({ _id: req.query.product_id });
      if (!deletedUser) {
        console.log('not found.');
        req.setFlash("danger", "cart item not found!");
      } else {
        console.log('deleted successfully.');
        req.setFlash("success", "Deleted successfully!");
      }
    }
    catch(err) {
      console.log(err);
    }
    res.redirect('/cart-added');
  });
  
  app.get('/deleteAllCart', async (req,res) => {
    try {
      const deletedUser = await carts.deleteMany({ user_id: req.query.user_id });
      if (!deletedUser) {
        console.log('not found.');
        req.setFlash("danger", "cart item not found!");
      } else {
        console.log('deleted successfully.');
        req.setFlash("success", "Deleted successfully!");
      }
    }
    catch(err) {
      console.log(err);
    }
    res.redirect('/cart-added');
  })
  
  app.get('/cart-added', async (req,res) => {
    try {
      const cartItems = await carts.find({}).lean();
      cart_array = cartItems.map(pr => ({ ...pr }));
      // console.log(products_array);
    } catch (err) {
      console.error(err);
    }
    res.render('cart',  { cartItems: cart_array });
  })
  
  app.get('/cart', async (req,res) => {
    console.log(req.query.service_detail);
  
    const data = new carts({
      user_id:req.query.user_id,
      seller_id:req.query.seller_id,
      service_title:req.query.service_title,
      service_price:req.query.service_price,
      service_detail:req.query.service_detail,
      service_url:req.query.service_url
    })
  
    try {
      const val = await data.save();
      console.log(val)
      req.setFlash("success", "Added to Cart");
    }
    catch (err) {
      console.log(err)
      req.setFlash("danger", "Could not Add to Cart");
    }
    return res.redirect("/view-services")
  })
  
module.exports = app;