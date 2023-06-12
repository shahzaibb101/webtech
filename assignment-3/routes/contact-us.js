const express = require("express");
const app = express.Router();
app.use(require("../middlewares/checkSession"));
let monmodel = require("../models/Query");

app.get('/contact-us', (req,res) => {
    res.render('contact-us')
})

app.post('/contact-us', async (req,res) => {

    const data= new monmodel({
        uname:req.body.uname,
        query:req.body.query,
    })
  
    try {
      const val = await data.save();
      console.log(val)
      req.setFlash("success", "Query Successfully Received");
      res.redirect("/")
    }
    catch (err) {
      console.log(err)
      req.setFlash("danger", "Could not submit query");
      res.redirect("/contact-us")
    }
  })

module.exports = app;