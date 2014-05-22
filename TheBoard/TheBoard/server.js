var http = require('http');
var express = require('express');

var app = express();

var ejsEngine = require('ejs-locals');

// --- view engine: jade ---
//app.set('view engine', 'jade');

// --- view engine: ejs ---
//app.engine('ejs', ejsEngine);   // support master pages
//app.set('view engine', 'ejs'); // ejs view engine

// --- view engine: vash ---
app.set('view engine', 'vash');

// Handle GET requests to the root
app.get('/', function (req, res) {
    
    // --- view engine: jade ---
    //res.render('jade/index', { title: 'Express + Jade' });

    // --- view engine: ejs ---
    // res.render('ejs/index', { title: 'Express + EJS' });

    // --- view engine: vash ---
    res.render('index', { title: 'Express + Vash' });

    console.log(req.url);
});

// Handle GET requests to api/users by returning JSON.
app.get('/api/users', function (req, res) {

    // object to return as JSON
    var someJsObject = {
        name: 'Shawn',
        isValid: true,
        group: 'Admin'
    };

    // specify content type explicitly in response header
    res.set('Content-Type', 'application/json');

    res.send(someJsObject);
    console.log(req.url);
});

var server = http.createServer(app);

server.listen(3000);