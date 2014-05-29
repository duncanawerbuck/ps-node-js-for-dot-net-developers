    // responsible for the API operations on the notes
(function (notesController) {

    var data = require('../data');

    notesController.init = function (app) {

        app.get('/api/notes/:categoryName', function (req, res) {

            var categoryName = req.params.categoryName;

            data.getNotes(categoryName, function (err, notes) {

                if (err) {
                    res.send(400, err);
                } else {

                    res.set('Content-Type', 'application/json'); // JSON is the default, but we're good citizens, so specifying content type explicitly.

                    res.send(notes);
                }
            });
        });
    };

})(module.exports);