module.exports = function(grunt) {

    grunt.initConfig({
        supervisor: {
            target: {
                script: 'server.js',
                options: {
                    extensions: ['js']
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-supervisor");
    grunt.registerTask('default', ['supervisor']);
};