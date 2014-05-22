var http = require('http');
var express = require('express');

var app = express();

// Use vash view engine (as opposed to Jade or EJS)
app.set('view engine', 'vash');

// Handle GET requests to the root
app.get('/', function (req, res) {

    res.render(
        // which view
        'index',
        
        // view model to pass to view
        { title: 'Express + Vash' }
    );

});

// Handle GET requests to api/users by returning JSON.
app.get('/api/users', function (req, res) {

    // object to return as JSON
    var someJsObject = {
        name: 'Shawn',
        isValid: true,
        group: 'Admin'
    };

    // specify content type explicitly in response header (defaults to JSON anyway)
    res.set('Content-Type', 'application/json');

    res.send(someJsObject);
});

var server = http.createServer(app);

server.listen(3000);