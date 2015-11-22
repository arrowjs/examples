/*
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2015 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);

    let theme = 'minimum';
    let themeFinal = 'min';
    let themeTemp = 'temp';
    let themePath = 'public/themes/';
    // Project configuration.
    grunt.initConfig({

        // Before generating any new files, remove any previously-created files.
        clean: {
            output: [themePath + themeTemp, themePath + themeFinal],
            tempHTML: themePath + themeFinal + '/**/*.html',
            temp: [themePath + themeTemp]
        },

        copy: {
            //Copy resource to temp directory
            resource2Temp: {
                files: [{
                    expand: true,
                    cwd: themePath + theme,
                    src: ['images/**', 'css/**', 'fonts/**', 'js/**', '*.png', '*.jpg', '*.ico', '*.html', '*.htm', '!*.twig'],
                    dest: themePath + themeTemp
                }]
            },
            //Copy twig file to temp directory then rename
            renameTwig2Html: {
                files: [{
                    expand: true,
                    cwd: themePath + theme + '/',
                    src: ['{,*/}*.twig'],
                    dest: themePath + themeTemp + '/',
                    rename: function(dest, src) {
                        return dest + src.replace('.twig','.html');
                    }
                }]
            },
            //Rename *html files in final theme
            renameHtml2Twig: {
                files: [{
                    expand: true,
                    cwd: themePath + themeFinal + '/',
                    src: ['{,*/}*.html'],
                    dest: themePath + themeFinal + '/',
                    rename: function(dest, src) {
                        return dest+ src.replace('.html','.twig');
                    }
                }]
            },
            //Copy resource to temp directory
            resource2Final: {
                files: [{
                    expand: true,
                    cwd: themePath + theme + '/',
                    src: ['images/**', 'fonts/**', 'js/**', '*.png', '*.jpg', '*.ico'],
                    dest: themePath + themeFinal + '/'
                }]
            }
        },

        uncss: {
            options: {
                csspath: __dirname + '/public'
            },
            dist: {
                src: [themePath + themeTemp + '{,*/}*.html'],
                dest: themePath + themeFinal + '/css/tidy.css'
            }
        },

        processhtml: {
            dist: {
                options: {
                    process: true
                },
                files: [{
                    expand: true,
                    cwd: themePath + themeTemp + '/',
                    src: ['**/*.html'],
                    dest: themePath + themeFinal + '/',
                    ext: '.html'
                }]
            }
        },

        cssmin: {
            dist: {
                options: {
                    compatibility: 'ie8',
                    keepSpecialComments: 0
                },
                files: {
                    '<%= uncss.dist.dest %>': '<%= uncss.dist.dest %>'
                }
            }
        },

        replace: {
            oldPath: {
                options: {
                    patterns: [
                        {
                            match: /\/themes\/minimum\//g,
                            replacement: '/themes/min/'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true,
                        src: [themePath + themeFinal + '/**/*.twig'],
                        dest: themePath  + themeFinal + '/'}
                ]
            }
        },

        compare_size: {
            files: [
                themePath + theme + '/css/**',
                themePath + themeFinal + '/css/**'
            ]
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', [
        'clean:output',
        'copy:resource2Temp',
        'copy:renameTwig2Html',
        'uncss:dist',
        /*'cssmin',
        'processhtml',
        'copy:renameHtml2Twig',
        'replace:oldPath',
        'clean:tempHTML',
        'copy:resource2Final',
        'clean:temp',
        'compare_size'*/
    ]);

};