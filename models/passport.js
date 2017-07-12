var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require("./UserModel.js");
var FacebookStrategy = require('passport-facebook').Strategy;

//passport configuration here
passport.use(new FacebookStrategy({
    clientID: '302618740147895',
    clientSecret: '796a1f1eced21d8b40543595b6ef4b3f',
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  },
  function (accessToken, refreshToken, profile, done) {

    //code to check database goes here
    User.findOne({
      'socialId': profile.id
    }, function (err, user) {
      if (!user) { // if user not exist create him
        user = new User({
          socialId: profile.id,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : "",
          provider: 'facebook',
          loginCount: 0
        })
      } else {
        user.loginCount++;
      }

      user.save(function (err, newUser) { // save the updated/new user
        if (err) {
          return done(err);
        } else {
          var token = jwt.sign({
            id: newUser.id,
            name: newUser.name,
          }, 'Elirans$uperC0mpl3xKey1337', {
            expiresIn: "7d"
          });
          return done(null, newUser);
        }
      });
    });
    //code to create JWT goes here

    //return done(null, profile)
  }
));

module.exports = passport;