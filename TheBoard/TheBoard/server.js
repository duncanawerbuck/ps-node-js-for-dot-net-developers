var http = require('http');
var express = require('express');

var app = express();

var controllers = require('./controllers');
var flash = require('connect-flash');

// Use vash view engine (as opposed to Jade or EJS)
app.set('view engine', 'vash');

// Opt into Services 
app.use(express.urlencoded()); // allows us to access body of post requests, as per course section "Inserting Data with a Form".
app.use(express.json()); // allows JSON-encoded bodies
app.use(express.cookieParser()); // required for session to be tied up with an individual browser.
app.use(express.session({ secret: 'PluralsightTheBoard' })); // enable session state. required for connect-flash to work
app.use(flash()); // connect-flash

app.use(express.static(__dirname + '/public'));

// use authentication
var auth = require('./auth');
auth.init(app);

// Map the routes
controllers.init(app);

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

var updater = require('./updater');
updater.init(server);