'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);

    //TODO: Make this better! read config/structure.js and config/view.js into theme, themeFinal and themeTemp
    let theme = 'minimum';
    let themeFinal = 'min';
    let themeTemp = 'temp';
    let themeFolder = '/themes/';
    let themePath = 'public' + themeFolder;
    // Project configuration.
    grunt.initConfig({

        // Before generating any new files, remove any previously-created files.
        clean: {
            output: [themePath + themeTemp, themePath + themeFinal],
            tempHTML: themePath + themeFinal + '/**/*.html',
            temp: [themePath + themeTemp]
        },

        copy: {
            //Copy resource original theme folder to temp folder
            resource2Temp: {
                files: [{
                    expand: true,
                    cwd: themePath + theme,
                    src: ['images/**', 'css/**', 'fonts/**', 'js/**', '*.png', '*.jpg', '*.ico', '*.html', '*.htm', '!*.twig'],
                    dest: themePath + themeTemp
                }]
            },
            //Copy twig files from original theme folder to temp folder then rename *.twig to *.html
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
            //Rename *html files to *twig file in destination folder 'min'
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
            //Copy resource from original theme folder to destination folder
            resource2Final: {
                files: [{
                    expand: true,
                    cwd: themePath + theme + '/',
                    src: ['images/**', 'fonts/**', 'js/**', '*.png', '*.jpg', '*.ico'],
                    dest: themePath + themeFinal + '/'
                }]
            }
        },
        //Remove unused CSS then combine into one file tidy.css
        uncss: {
            options: {
                csspath: __dirname + '/public'
            },
            dist: {
                src: [themePath + themeTemp + '/**/*.html'],
                dest: themePath + themeFinal + '/css/tidy.css'
            }
        },
        //Change link from original css to tidy.css
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
        //Minify tidy.css
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
        //Replace link to original theme resource to destination theme resource
        replace: {
            oldPath: {
                src: [themePath + themeFinal + '/**/*.twig'],
                overwrite: true,
                replacements: [{
                    from: new RegExp(themeFolder + theme + '/', 'g'),
                    to: themeFolder + themeFinal + '/'
                }]
            }
        },

        //Compare size of all original CSS files with an output CSS file, tidy.css
        compare_size: {
            files: [
                themePath + theme + '/css/**',
                themePath + themeFinal + '/css/**'
            ]
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Run all tasks with user types `grunt`
    grunt.registerTask('default', [
        'clean:output',
        'copy:resource2Temp',
        'copy:renameTwig2Html',
        'uncss:dist',
        'cssmin',
        'processhtml',
        'copy:renameHtml2Twig',
        'replace:oldPath',
        'clean:tempHTML',
        'copy:resource2Final',
        'clean:temp',
        'compare_size'
    ]);

};