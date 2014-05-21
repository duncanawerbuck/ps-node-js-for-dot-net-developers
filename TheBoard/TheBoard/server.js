var http = require("http");
var express = require("express");

var app = express();

// Handle GET requests to the root
app.get('/', function(req, res) {
    res.send("<html><head></head><body><h1>Express FTW!</h1></body><html>");
    console.log(req.url);
});

var server = http.createServer(app);

server.listen(3000);