const express = require("express");
const mongoose = require('mongoose');
const app = express();
var reload = require('reload');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
var expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const bcrypt = require("bcryptjs");
var users_array = [];

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(expressLayouts);
app.use(cookieParser())
app.use(
  session({
    secret: "Secret",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/",require("./routes/auth"));
app.use(require("./middlewares/checkSession"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("homepage");
});
let monmodel = require("./models/User");

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



app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Making connection
mongoose.connect("mongodb://localhost/website", { useNewUrlParser: true});

mongoose.connection
    .once("open", () => console.log("Connected!"))
    .on("error", error => {
        console.log(error);
    });


app.listen(3000, () => {
  console.log("Server Started");
});

reload(app);