(function(angular) {

    var theModule = angular.module('notesView', []);

    theModule.controller('notesViewController', [
        function() {
            var vm = this;

            this.hero = 'batman';
        }
    ]);

})(window.angular);