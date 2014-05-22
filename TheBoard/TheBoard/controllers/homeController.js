(function(homeController) {

    homeController.init = function(app) {

        // Handle GET requests to the root
        app.get('/', function(req, res) {

            res.render('index', { title: 'Express + Vash' });

            // log current time
            console.log(new Date().toTimeString().split(' ')[0]);
        });

    };

})(module.exports);