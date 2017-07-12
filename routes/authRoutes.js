var express = require('express');
var router = express.Router();
var passport = require('../models/passport');

// requesting email details
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

//call back from facebook 
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: "/"
  }),
  function (req, res) {
    console.log(req.user);
    res.redirect('/authorization?token=' + req.user.token + "&name=" + req.user.name);
  }
);

module.exports = router;