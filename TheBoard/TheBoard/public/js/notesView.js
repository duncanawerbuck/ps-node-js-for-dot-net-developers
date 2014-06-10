(function(angular) {

    var theModule = angular.module('notesView', ['ui.bootstrap']);

    theModule.controller('notesViewController', ['$window', '$http',
        function($window, $http) {
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

            vm.save = function () {
                $http.post(notesUrl, vm.newNote)
                    .then(function(result) {
                        // success
                        vm.notes.push(result.data);
                        vm.newNote = createBlankNote();
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