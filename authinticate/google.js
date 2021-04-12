var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User=require('../data_collection/user')
var google =require("./clientidandsecret")
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    console.log('Deserialize user called google.')
    User.findById(id, function(err, user) {
        done(err, user);
  });
  
})
passport.use(new GoogleStrategy({
    clientID: google.googleclientID,
    clientSecret:google.googleclientSecret, 
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    
       User.findOne({ 'uid': profile.id }, function (err, user) {
        if (err)
        return done(err);
    // if the user is found,  then log them in
     if (user) {
        console.log("user found")
        return done(null, user); // user found, return that  user
    } else {
        // if there is no user found with that Google id, create them
        var newUser = new User();
        // set all of the Google information in our user model
        newUser.acc= 2;
        newUser.uid    = profile.id; // set the users Google id                   
        newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
        newUser.email = profile.emails[0].value; // Google can return multiple emails so we'll take the first
        newUser.gender = profile.gender;
        newUser.pic = profile.photos[0].value;
        // save our user to the database
        newUser.save(function(err,result) {
            if (err)
                throw err;
            // if successful, return the new user
            console.log(result);
            return done(null, newUser);

        });
    }
       });
   
}));