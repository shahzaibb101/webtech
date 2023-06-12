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
var own_services_array = [];

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(expressLayouts);
app.use(cookieParser())
app.use(
  session({
    secret: "Secret",
    cookie: { maxAge: 60000000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/",require("./routes/auth"));
app.use("/",require("./routes/contact-us"));
app.use("/",require("./routes/update"));
app.use("/",require("./routes/cart"));
app.use("/",require("./routes/delete"));
app.use("/",require("./routes/seller"));
app.use("/",require("./routes/service"));
app.use(require("./middlewares/checkSession"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("homepage");
});
let monmodel = require("./models/User");
let services = require("./models/Service");




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