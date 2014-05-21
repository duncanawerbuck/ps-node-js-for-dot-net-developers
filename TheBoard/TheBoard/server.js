var http = require("http");
var express = require("express");

var app = express();

// Handle GET requests to the root
app.get('/', function (req, res) {
    res.send("<html><head></head><body><h1>Express FTW!</h1></body><html>");
    console.log(req.url);
});

// Handle GET requests to api/users by returning JSON.
app.get('/api/users', function (req, res) {

    // object to return as JSON
    var someJsObject = {
        name: "Shawn",
        isValid: true,
        group: "Admin"
    };

    // specify content type explicitly in response header
    res.set("Content-Type", "application/json");

    res.send(someJsObject);
    console.log(req.url);
});

var server = http.createServer(app);

server.listen(3000);