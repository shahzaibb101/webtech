const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
let monmodel = require("../models/User");
let services = require("../models/Service");
var users_array = [];

app.use(require("../middlewares/checkSession"));

app.post('/upd-services', async (req,res) => {
    // console.log(req.body._id)
    // console.log(req.body.title)
    // console.log(req.body.price)
    // console.log(req.body.url)
    const updatedUser = await services.findOneAndUpdate(
      { _id: req.body._id },
      { title: req.body.title },
      { new: true }
    );
  
    if (!updatedUser) {
      req.setFlash("danger","service not found!");
    }
    else {
      const updatedUser = await services.findOneAndUpdate(
        { _id: req.body._id },
        { explain: req.body.explain },
        { new: true }
      );
      if (!updatedUser) {
        req.setFlash("danger","service not found!");
      }
      else {
        const updatedUser = await services.findOneAndUpdate(
          { _id: req.body._id },
          { price: req.body.price },
          { new: true }
        );
        if (!updatedUser) {
          req.setFlash("danger","service not found!");
        }
        else {
          const updatedUser = await services.findOneAndUpdate(
            { _id: req.body._id },
            { url: req.body.url },
            { new: true }
          );
          if (!updatedUser) {
            req.setFlash("danger","service not found!");
          }
          else {
            console.log("succesfull updation")
            req.setFlash("success","updated successfully!")
          }
        }
      }
    }
    return res.redirect('/');
  })
  
  app.post('/upd-own-services', async (req,res) => {
    const ser = await services.findOne({ _id: req.body.id }).lean();
  
    const data = {
      id: ser._id,
      title: ser.title,
      explain: ser.explain,
      price: ser.price,
      url: ser.url
    }
    res.render('upd-own-services', {service: data});
  })

  app.route('/update-email')
.get((req,res) => {
  req.setUpdateKey("email");
  console.log("inside get!");
  return res.render('profile');
})
.post(async (req,res) => {
  const updatedUser = await monmodel.findOneAndUpdate(
    { uname: req.body.uname },
    { email: req.body.email },
    { new: true }
  );

  if (!updatedUser) {
    req.setFlash("danger","user not found!");
  }
  else {
    req.setFlash("success","updated successfully!")
  }
  return res.redirect('/profile');
})

app.route('/update-phone')
.get((req,res) => {
  req.setUpdateKey("phone");
  res.render('profile')
})
.post(async (req,res) => {
  const updatedUser = await monmodel.findOneAndUpdate(
    { uname: req.body.uname },
    { phno: req.body.phno },
    { new: true }
  );

  if (!updatedUser) {
    req.setFlash("danger","user not found!");
  }
  else {
    req.setFlash("success","updated successfully!")
  }
  return res.redirect('/profile');
})

app.route('/update-password')
.get((req,res) => {
  req.setUpdateKey("password");
  res.render('profile');
})
.post(async (req,res) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  const updatedUser = await monmodel.findOneAndUpdate(
    { uname: req.body.uname },
    { password: hashed },
    { new: true }
  );

  if (!updatedUser) {
    req.setFlash("danger","user not found!");
  }
  else {
    req.setFlash("success","updated successfully!")
  }
  return res.redirect('/profile');
})

  module.exports = app;