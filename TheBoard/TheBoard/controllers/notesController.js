    // responsible for the API operations on the notes
(function (notesController) {

    var data = require('../data');
    var auth = require('../auth');

    notesController.init = function (app) {


        // GET notes by category name
        app.get('/api/notes/:categoryName',
            auth.ensureApiAuthenticated, // only if api is authenticated...
            function (req, res) {

            var categoryName = req.params.categoryName;

            data.getNotes(categoryName, function (err, notes) {

                if (err) {
                    res.send(400, err);
                } else {

                    res.set('Content-Type', 'application/json'); // JSON is the default, but we're good citizens, so specifying content type explicitly.
                    
                    res.send(notes.notes);
                }
            });
        });

        // POST - add a new note
        app.post('/api/notes/:categoryName',
            auth.ensureApiAuthenticated, // only if api is authenticated...
            function(req, res) {

            var categoryName = req.params.categoryName;

            var noteToInsert = {
                note: req.body.note,
                color: req.body.color,
                author: 'Shawn Wildermuth'
            };

            data.addNote(categoryName, noteToInsert, function(err) {
                if (err) {
                    res.send(400, "Failed to add note to data store");
                } else {
                    res.set('Content-Type', 'application/json');
                    res.send(201, noteToInsert);
                }
            });
        });

    };

})(module.exports);