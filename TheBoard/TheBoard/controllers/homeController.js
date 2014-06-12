(function(homeController) {

    homeController.init = function(app) {

        var data = require('../data');

        // Handle GET requests to the root
        app.get('/', function(req, res) {

            data.getNoteCategories(function(err, results) {


                res.render('index', {
                    title: 'The Board',
                    error: err,
                    categories: results,
                    newCatError: req.flash('newCatName'),
                    user: req.user // doesn't exist in most cases, but the passport middleware will ensure this exists if a user is in fact logged in
                });

            });

            // --------------------------------------------------
            // log current time
            console.log(new Date().toTimeString().split(' ')[0]);
        });

        // Handle GET requests for all notes for a given category
        app.get("/notes/:categoryName", function(req, res) {
                var categoryName = req.params.categoryName;
                res.render("notes", { title: categoryName, user: req.user });
            }
        );

        app.post("/newCategory", function(req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function(err) {
                if (err) {
                    // Handle error
                    console.log(err);

                    // node package 'connect-flash' allows us to:
                    req.flash("newCatName", err);

                    res.redirect('/');
                } else {
                    res.redirect('/notes/' + categoryName);
                }
            });
        });

    };

})(module.exports);