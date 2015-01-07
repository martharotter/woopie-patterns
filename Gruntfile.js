module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourcemap: 'none'
            },
            compile: {
                files: {
                    'src/css/woop.css': ['src/scss/woop.scss'],
                }
            },
        },

        concat: {
            css: {
                src: [
                     'src/css/bootstrap.css',
                     'src/css/colorpicker.css',
                     'src/css/font-awesome.css',
                     'src/css/lightbox.css',
                     'src/css/opensans.css',
                     'src/css/styles.css',
                     'src/css/woop.css',
                    ],
                dest: 'src/css/combined.css'
            },
            css_prod: {
                src: [
                     'src/css/bootstrap.css',
                     'src/css/colorpicker.css',
                     'src/css/font-awesome.css',
                     'src/css/lightbox.css',
                     'src/css/opensans.css',
                     'src/css/woop.css',
                    ],
                dest: 'src-prod/css/combined.css'
            },

            js: {
                src: [
                    'src/js/scripts.js',
                ],
                dest: 'src/js/production.js',
            }
        },
        jshint: {
            'options': {
                'evil': false,
                'expr': true,
                '-W069': true
            },
            beforeconcat: [ 'src/js/scripts.js'],
            afterconcat: []
        },
        uglify: {
            build: {
                src: 'src/js/production.js',
                dest: 'src/js/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'src/img/build'
                }]
            }
        },

        cssmin: {
            css:{
                src: 'src/css/combined.css',
                dest: 'src/css/combined.min.css'
            },
            css_prod:{
                src: 'src-prod/css/combined.css',
                dest: 'src-prod/css/combined.min.css'
            }
        },

        copy: {
          build: {
            expand: true,
            flatten: true,
            src: [ 'src-prod/css/combined.min.css' ],
            dest: '/Users/martha/Projects/Woopie_Platform_newui/Woopie_Platform/myproject/static/css/v2/',
          },
        },

        validation: {
            options: {
                stoponerror: false,
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'] // ignores these errorjws
            },
            files: {
                src: [/*'src/index.html', */
                      'src/forms.html',
                      'src/formElements.html'
                ]
            }
        }
    });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html-validation');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['sass', 'concat', 'jshint', 'uglify', 'cssmin']);
  grunt.registerTask('production', ['sass', 'concat:css_prod', 'jshint', 'uglify', 'cssmin:css_prod', 'copy']);
  grunt.registerTask('imagemin', ['imagemin']);
  grunt.registerTask('validate', ['validation']);
  grunt.registerTask('buildsass', ['sass']);
};
