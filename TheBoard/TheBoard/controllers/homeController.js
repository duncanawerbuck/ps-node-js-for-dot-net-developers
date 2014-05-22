(function(homeController) {

    homeController.init = function(app) {

        // Handle GET requests to the root
        app.get('/', function(req, res) {

            res.render('index', { title: 'Express + Vash' });

        });

    };

})(module.exports);