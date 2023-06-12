const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
let monmodel = require("../models/User");
let services = require("../models/Service");
var users_array = [];

app.use(require("../middlewares/checkSession"));

app.post('/del-own-services', async (req,res) => {
    try {
      const deletedUser = await services.findOneAndDelete({ _id: req.body.id });
      if (!deletedUser) {
        req.setFlash("danger", "User not found!");
        console.log('not found.');
      } else {
        req.setFlash("success", "Deleted successfully!");
        console.log('deleted successfully.');
      }
    } catch (err) {
      req.setFlash("danger", "Could not delete service!");
      console.error(err);
    }
    res.redirect('/');
  })

  app.route('/delete')
  .post(async (req,res) => {
    (async () => {
      try {
        const deletedUser = await monmodel.findOneAndDelete({ uname: req.body.uname });
        if (!deletedUser) {
          req.setFlash("danger", "User not found!");
          console.log('not found.');
        } else {
          req.setFlash("success", "Deleted successfully!");
          console.log('deleted successfully.');
        }
      } catch (err) {
        req.setFlash("danger", "Could not delete user!");
        console.error(err);
      }
      })();
      res.redirect('/view-users');
  });
  
  module.exports = app;