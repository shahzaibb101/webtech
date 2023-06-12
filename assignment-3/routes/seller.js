const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
let monmodel = require("../models/User");

app.get('/seller-signup', (req,res) => {
    res.render('seller-signup')
  })
  
  app.post('/seller-signup', async (req,res) => {
    console.log("inside post function!");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    var admin = "seller";
    
    const data= new monmodel({
        uname:req.body.uname,
        email:req.body.email,
        phno:req.body.phno,
        password:hashed,
        role:admin,
        about:req.body.about,
        profile_pic:req.body.profile_pic,
        main:req.body.main
    })
  
    try {
      const val = await data.save();
      console.log(val)
      req.setFlash("success", "Sign Up successful");
      res.redirect("/login")
    }
    catch (err) {
      console.log(err)
      req.setFlash("danger", "Could not Sign Up");
      res.redirect("/signup-seller")
    }
  })

  
  app.get('/seller', (req,res) => {
    res.render('seller')
  })


  module.exports = app;