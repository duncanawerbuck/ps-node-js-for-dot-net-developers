(function(angular) {

    var theModule = angular.module('notesView', ['ui.bootstrap']);

    theModule.controller('notesViewController', ['$scope', '$window', '$http',
        function($scope, $window, $http) {
            var vm = this;
            vm.notes = [];

            vm.newNote = createBlankNote();

            // categoryName is last part of url...
            var urlParts = $window.location.pathname.split('/');
            var categoryName = urlParts[urlParts.length - 1];

            var notesUrl = '/api/notes/' + categoryName;

            $http.get(notesUrl).then(function(result) {
                vm.notes = result.data;
                }, 
                function(err) {
                    alert(err);
                });

            /* start socket.io stuff **************************/

            // initiate socket.io connection with the server.
            var socket = io.connect(); // can take a url param, but we don't need to do that, since the page was served by the same server that has the socket we're connecting to.

            socket.emit('join category', categoryName);

            // listen out for 'broadcast note' events that are emitted from the server (see updater\index.js).
            socket.on('broadcast note', function (msg) {
                vm.notes.push(msg);
                $scope.$apply();
            });

            /* end socket.io stuff **************************/

            vm.save = function () {
                $http.post(notesUrl, vm.newNote)
                    .then(function(result) {
                        // success
                        vm.notes.push(result.data);
                        vm.newNote = createBlankNote();
                        socket.emit('newNote', { category: categoryName, note: result.data });
                    },
                        function(err) {
                            alert(err);
                        });
            };

            function createBlankNote() {
                vm.newNote = {
                    note: '',
                    color: 'yellow'
                };
            }

        }
    ]);

})(window.angular);