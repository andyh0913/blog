var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

var mongoose = require('./mongoose.js');


passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(session({ 
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())


var User = require('./models/User.js');

passport.use('login', new LocalStrategy({
    usernameField: 'account',
    passReqToCallback: true
  },
  function (req, account, password, done) {
    User.findOne({ account: account }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, req.flash('info', 'User not found.'))
      }
      if (!isValidPassword(user, password)) {
        return done(null, false, req.flash('info', 'Invalid password'))
      }
      return done(null, user)
    })
  }
));

passport.use('signup', new LocalStrategy({
  usernameField: 'account',
  passReqToCallback: true
}, function (req, account, password, done) {
  var findOrCreateUser = function () {
    User.findOne({ account: account }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('info', 'User already exists'));
      } else {
        var newUser = new User();
        newUser.account = account;
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        newUser.username = req.params.username;
        newUser.save(function (err, user) {
          if (err) {
            throw err;
          }
          return done(null, user);
        });
      }
    });
  };
  process.nextTick(findOrCreateUser)
}));