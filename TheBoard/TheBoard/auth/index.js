(function(auth) {
    auth.init = function(app) {

        app.get('/register', function(req, res) {
                res.render('register', { title: 'Register for the Board' });
            }
        );

    };
})(module.exports);