var express = require('express');
var router = express.Router();
var passport = require('../models/passport');

// requesting email details
router.get('/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

//call back from facebook 
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;