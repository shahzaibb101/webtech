const express = require("express");
const mongoose = require('mongoose');
const app = express();
var reload = require('reload');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
var expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const flash = require('connect-flash')

// app.use((req, res, next) => {
//   // res.send("site is down for maintenance");
//   console.log(req.url);
//   next();
// });
// app.set("view engine", "ejs");
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
app.use(require("./middlewares/checkSession"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("homepage");
});

// app.use((req,res,next) => {
//   if(req.session.user && req.cookies.user_sid) {
//     res.redirect('/dashboard')
//   }
//   next()
// })

var sessionChecker = (req,res,next) => {
  if(req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard')
  }
  else {
    next()
  }
}

// app.get('/',sessionChecker,(req,res) => {
//   res.redirect('/login')
// })

app.route('/login')
.get(sessionChecker,(req,res) => {
  res.render("login");
})
.post(async (req,res) => {
  console.log("Inside login route post function!");
  var uname = req.body.uname;

  try {
    var user = await monmodel.findOne({uname:uname}).exec()
    if(!user) {
      req.setFlash("danger", "User with this email not present");
      return res.render("login")
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(validPassword) {
      req.session.user = user
      console.log("matched");
      return res.render("dashboard")
    }
    else {
      console.log("not matched");
      return res.render("login")
    }
    console.log(user)
  }
  catch (err) {
    console.log(err)
  }
})

app.route('/signup')
.get(sessionChecker,(req,res) => {
  res.render("signup")
})
.post(async (req,res) => {
  console.log("inside post function!");
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  
  const data= new monmodel({
      uname:req.body.uname,
      email:req.body.email,
      phno:req.body.phno,
      password:hashed
  })

  try {
    const val = await data.save();
    console.log(val)
    res.render("login")
  }
  catch (err) {
    console.log(err)
    res.render("signup")
  }
})


// app.get('/dashboard', (req,res) => {
//   if(req.session.user && req.cookies.user_sid) {
//     console.log("true")
//     // res.sendFile(__dirname + "/public/dashboard.html")
//     res.send("ok")
//   }
//   else {
//     res.redirect('/login');
//   }
//   console.log("dashboard")
// })

// Making connection
mongoose.connect("mongodb://localhost/website", { useNewUrlParser: true});

mongoose.connection
    .once("open", () => console.log("Connected!"))
    .on("error", error => {
        console.log(error);
    });

// Defining User schema
const userSchema = new mongoose.Schema({
    uname: {
      type: String,
      unique: true,
      required: true
    }, 
    email: {
      type: String,
      unique: true,
      required: true
    }, 
    phno: {
      type: Number,
      required: true
    }, 
    password: {
      type: String,
      required: true
    }
})

userSchema.pre("save",function(next) {
  if(this.isModified("password")) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password,10)
  next()
})

userSchema.methods.comparePassword = function(plainText,callBack) {
  return callBack(null,bcrypt.compareSync(plainText,this.password))
}

// Defining User model
const monmodel = mongoose.model('User', userSchema);

app.listen(3000, () => {
  console.log("Server Started");
});

reload(app);