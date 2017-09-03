var passport = require('passport');
var LocalStrategy =require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/user');
var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
}, function(accessToken, refreshToken, profile, done) {
    //Find the user in our mongodb
    User.findOne({OauthId: profile.id}, function(err, user) {
        if(err) console.log(err);
        
        //If user found then they have already registered before so move on
        if(!err && user!==null) {
            done(null, user);
        } else { ///Create a new user with this profile
            user = new User({username: profile.displayName});
            user.OauthId = profile.id;
            user.OauthToken = accessToken;
            user.save(function(err) {
                if(err) console.log(err);
                else {
                    console.log("Saving user...");
                    done(null, user);
                }
            }); //end save
        } //end else create user
    }); //end find user profile
})); //end facebookstrategy and passport