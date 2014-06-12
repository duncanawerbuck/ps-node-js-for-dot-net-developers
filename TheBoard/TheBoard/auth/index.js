(function(auth) {

    var data = require('../data');

    auth.init = function(app) {

        app.get('/register', function(req, res) {
                res.render('register', { title: 'Register for the Board', message: req.flash('registrationError') });
            }
        );

        app.post('/register', function (req, res) {
            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: '',
                salt: ''
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