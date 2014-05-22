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

    };

})(module.exports);