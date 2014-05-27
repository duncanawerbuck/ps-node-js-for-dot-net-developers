(function(database) {

    var mongodb = require('mongodb');
    var mongoUrl = 'mongodb://localhost:27017/theBoard';
    var theDb = null; // this will be re-used so the db is only created once (on first request).

    database.getDb = function(next) { // the 'next' param is the callback function. Takes an error as first param, or the created db as the second.
        if (!theDb) {
            // connect to the db
            mongodb.MongoClient.connect(mongoUrl, function(err, db) {
                if (err) {
                    next(err, null);
                } else {
                    // Shawn recommends that we wrap the db in an object so we can extend it easily later.
                    theDb = {
                        db: db,
                        notes: db.collection('notes')
                    };
                    next(null, theDb);
                }
            });
        } else { // db already exists...
            next(null, // no error
                theDb);
        }
    };

})(module.exports);