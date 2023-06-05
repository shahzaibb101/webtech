const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
let monmodel = require("../models/User");
app.use(require("../middlewares/checkSession"));
var users_array = [];


app.route('/login')
.get((req,res) => {
  res.render("login");
})
.post(async (req,res) => {
  console.log("Inside login route post function!");
  var uname = req.body.uname;

  try {
    var user = await monmodel.findOne({uname:uname}).exec()
    if(!user) {
      req.setFlash("danger", "User with this email not present");
      return res.redirect("/login")
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(validPassword) {
      req.session.user = user
      console.log("matched");
      req.setFlash("success", "Logged in Successfully");
      return res.redirect("/")
    }
    else {
      console.log("not matched");
      req.setFlash("danger", "Invalid Password");
      return res.redirect("/login")
    }
    console.log(user)
  }
  catch (err) {
    console.log(err)
  }
})

app.route('/signup')
.get((req,res) => {
  res.render("signup")
})
.post(async (req,res) => {
  console.log("inside post function!");
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  var admin = false;
  if(req.body.isAdmin=='on') admin = true;
  
  const data= new monmodel({
      uname:req.body.uname,
      email:req.body.email,
      phno:req.body.phno,
      password:hashed,
      isAdmin:admin
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
    res.redirect("/signup")
  }
})

module.exports = app;