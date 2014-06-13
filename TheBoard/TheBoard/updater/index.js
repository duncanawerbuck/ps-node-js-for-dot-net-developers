(function(updater) {

    var socketio = require('socket.io');

    updater.init = function(server) {
        var io = socketio.listen(server);

        // now we can use the io's sockets member to listen for messages, using an 'on' call.
        io.sockets.on('connection', function(socket) {

            /*  'socket' is the socket that connected with us.
            we may be connected to a lot of different clients, and a connection happens
            for each of those clients. So we can work with this socket object inside this
            callback, and this way we have a single socket and each of its associated
            objects releated to a SINGLE client that we're connected to.
            */
            console.log('socket was connected at: ' + new Date().toTimeString().split(' ')[0]);
        });
    };

})(module.exports);