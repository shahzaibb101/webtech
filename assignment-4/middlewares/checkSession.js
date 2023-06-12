//add this middleware befor any route and after session middleware
module.exports = function (req, res, next) {
    res.locals.updatekey = null;
    res.locals.user = req.session.user;
    res.locals.flash = req.session.flash;
    req.session.flash = null;
    req.setUpdateKey = function (key) {
      res.locals.updatekey = key;
    }
    req.setFlash = function (type, message) {
      req.session.flash = { type, message };
    };
    next();
  };
  