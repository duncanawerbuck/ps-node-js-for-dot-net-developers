(function(angular) {

    var theModule = angular.module('notesView', []);

    theModule.controller('notesViewController', [
        function() {
            var vm = this;

            vm.notes = [
                {
                    note: 'Hello World',
                    color: 'yellow',
                    author: 'Shawn Wildermuth'
                },
                {
                    note: 'Goodbye World',
                    color: 'orange',
                    author: 'Shawn Wildermuth'
                },
                {
                    note: 'Hello, I\'m back.',
                    color: 'blue',
                    author: 'Shawn Wildermuth'
                },
                {
                    note: 'Hello from JS',
                    color: 'orange',
                    author: 'Shawn Wildermuth'
                }
                ];
        }
    ]);

})(window.angular);