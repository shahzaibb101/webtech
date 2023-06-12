const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
let monmodel = require("../models/User");
let carts = require("../models/Cart");
let services = require("../models/Service");

app.get('/personal-info', (req,res) => {
    res.render('personal-info')
  })
  
  app.get('/seller-profile', async (req,res) => {
    return res.render('seller-profile')
  })
  
  app.get('/view-services', async (req,res) => {
    try {
      const products = await services.find({}).lean();
      products_array = products.map(pr => ({ ...pr }));
      // console.log(products_array);
    } catch (err) {
      console.error(err);
    }
    res.render('view-services',  { products: products_array });
  })
  
  app.post("/own-services", async (req,res) => {
    try {
      console.log(req.body.id);
      const products = await services.find({user_id: req.body.id}).lean();
      own_services_array = products.map(pr => ({ ...pr }));
      console.log(own_services_array);
    } catch (err) {
      console.error(err);
    }
    res.render('own-services',  { products: own_services_array });
  })
  
  app.get('/add-services', (req,res) => {
    res.render('add-services')
  })
  
  app.post('/add-services', async (req,res) => {
    console.log("inside add-services post function!");
  
    const data= new services({
        user_id:req.body.user_id,
        title:req.body.title,
        explain:req.body.explain,
        price:req.body.price,
        url:req.body.url
    })
  
    try {
      const val = await data.save();
      console.log(val)
      req.setFlash("success", "Service Added");
      res.redirect("/")
    }
    catch (err) {
      console.log(err)
      req.setFlash("danger", "Could not add Service");
      res.redirect("/add-services")
    }
  })
  
  
  
  
  app.route('/view-users')
  .get(async (req,res) => {
    (async () => {
      try {
        const users = await monmodel.find({}).lean();
        users_array = users.map(user => ({ ...user }));
        console.log(users_array);
      } catch (err) {
        console.error(err);
      }
      res.render('view-users', {users: users_array});
    })();
  })
  
  
  app.route('/profile')
  .get((req,res) => {
    res.render('profile');
  })
  
  app.route('/logout')
  .get((req,res) => {
    req.session.user = null;
    req.setFlash("danger", "Logged out!");
    res.redirect("/login");
  })
  
  app.route('/dashboard')
  .get((req,res) => {
    res.render("dashboard");
  })

  module.exports = app;