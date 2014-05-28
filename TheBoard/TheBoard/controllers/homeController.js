(function(homeController) {

    homeController.init = function(app) {

        var data = require('../data');

        // Handle GET requests to the root
        app.get('/', function(req, res) {

            data.getNoteCategories(function(err, results) {


                res.render('index', { title: 'Express + Vash', error: err, categories: results });

            });

            // --------------------------------------------------
            // log current time
            console.log(new Date().toTimeString().split(' ')[0]);
        });

        app.post("/newCategory", function(req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function(err) {
                if (err) {
                    // TODO:Handle error
                    console.log(err);
                    res.redirect('/');
                } else {
                    res.redirect('/notes/' + categoryName);
                }
            });
        });

    };

})(module.exports);