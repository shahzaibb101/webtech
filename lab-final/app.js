const express = require("express");
const mongoose = require('mongoose');
const app = express();
var reload = require('reload');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
var expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const bcrypt = require("bcryptjs");
var foods_array = [];

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

let model = require("./models/Food");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.get("/",async (req,res) => {
    console.log("home route");
    (async () => {
      try {
        const foods = await model.find({}).lean();
        foods_array = foods.map(food => ({ ...food }));
        console.log(foods_array);
      } catch (err) {
        console.error(err);
      }
      return res.render('homepage', {foods: foods_array});
    })();
})

app.post("/delete", (req,res) => {
    (async () => {
    try {
        const deletedUser = await model.findOneAndDelete({ name: req.body.name });
        if (!deletedUser) {
        // req.setFlash("danger", "User not found!");
        console.log('not found.');
        } else {
        // req.setFlash("success", "Deleted successfully!");
        console.log('deleted successfully.');
        }
    } catch (err) {
        // req.setFlash("danger", "Could not delete user!");
        console.error(err);
    }
    })();
    res.redirect('/');
})

app.get("/add-food", (req,res) => {
    res.render('add-items');
})

app.post("/add-food", async (req,res) => {
    console.log("inside post function!");
    
    const data= new model({
        type:req.body.type,
        name:req.body.name,
        calories:req.body.calories
    })

    try {
        const val = await data.save();
        console.log(val)
        // req.setFlash("success", "Sign Up successful");
        res.redirect("/")
    }
    catch (err) {
        console.log(err)
        // req.setFlash("danger", "Could not Sign Up");
        res.redirect("/add-food")
    }
})

// Making connection
mongoose.connect("mongodb://localhost/final", { useNewUrlParser: true});

mongoose.connection
    .once("open", () => console.log("Connected!"))
    .on("error", error => {
        console.log(error);
    });


app.listen(3000, () => {
  console.log("Server Started");
});

reload(app);