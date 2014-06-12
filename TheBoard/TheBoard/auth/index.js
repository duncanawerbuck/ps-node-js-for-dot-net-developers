(function(auth) {

    var data = require('../data');
    var hasher = require('./hasher');

    var passport = require('passport');
    var localStrategy = require('passport-local').Strategy;

    function userVerify(username, password, next) {
        data.getUser(username, function(err, user) {
            if (!err && user) {
                
                // we have a valid object to test against
                var testHash = hasher.computeHash(password, user.salt);

                if (testHash === user.passwordHash) {
                    // user is validated!
                    next(null, user);
                    return;
                }
            }

            // Error (or invalid login attempt) - Note that passport doesn't follow normal convention of first param being error.
            next(null, false, { message: 'Invalid credentials' }); // This is actually for ANY error (invalid credentials or other, e.g. db error).
        });
    }

    auth.init = function (app) {

        // set up passport authentication
        passport.use(new localStrategy(userVerify));

        // passport needs to know how to read/write a user.
        passport.serializeUser(function(user, next) {
            next(null, user.username);
        });

        passport.deserializeUser(function(key, next) {
            data.getUser(key, function(err, user) {
                if (err) {
                    next(null, false, { message: 'Failed to retrieve user.' });
                } else {
                    next(null, user);
                }
            });
        });

        app.use(passport.initialize());
        app.use(passport.session());

        app.get('/register', function(req, res) {
                res.render('register', { title: 'Register for the Board', message: req.flash('registrationError') });
            }
        );

        app.post('/register', function (req, res) {

            var salt = hasher.createSalt();

            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password, salt),
                salt: salt
            };

            data.addUser(user, function(err) {
                if (err) {
                    req.flash('registrationError', 'Could not save user to database.');
                    res.redirect('/register');
                } else {
                    res.redirect('/login');
                }
            });

        });
    };
})(module.exports);