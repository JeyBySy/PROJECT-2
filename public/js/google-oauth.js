const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '220011432454-t5e6gg8cador08fi5oehioojdqm7fshc.apps.googleusercontent.com',
    clientSecret: 'AdII2GLWIFQv-VkF--Gq_sLo', 
    callbackURL: "http://localhost:3000/google/callback" //"https://beylands-admin.herokuapp.com/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
  }
));