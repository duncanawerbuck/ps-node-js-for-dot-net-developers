var http = require("http");

var server = http.createServer(function(req, res) {

    if (req.url === '/favicon.ico') { res.end();
        return;
    }

    var htmlResponse = "<html><head></head><body><h1>" + req.url + "</h1></body>";
    res.write(htmlResponse);
    console.log('The req.url is: ' + req.url);
    res.end();
});

server.listen(3000);