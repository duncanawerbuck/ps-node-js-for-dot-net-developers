(function(angular) {

    var theModule = angular.module('notesView', []);

    theModule.controller('notesViewController', ['$window', '$http',
        function($window, $http) {
            var vm = this;

            vm.notes = [];
            
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
        }
    ]);

})(window.angular);