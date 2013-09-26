module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["assets/css/min", "assets/js/min"],
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'

      },
      dist: {
        files:[
          {src: ['assets/js/*'],dest:'assets/js/min/joinit-springer.min.js'}
        ]
      }
    },

    cssmin: {
      minify: {
        files: {
          'assets/css/min/base.min.css': ['assets/css/base.css'],
          'assets/css/min/joinit.springer.min.css': ['assets/css/joinit.springer.css']
        }
      }
    }

  });



  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean','uglify','cssmin']);


};