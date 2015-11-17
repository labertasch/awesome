module.exports = function(grunt) {
    grunt.initConfig({
        exec: {
            install: {
                command: 'mvn install',
                stdout: true,
                stderr: true
            }
        },
        qunit: {
               options: {
                   userName: "admin",
                   password: "admin",
                   httpBase: {
                       host: "http://admin:admin@localhost:4502",
                       doRewrite: function (file) {
                           return file.replace("src/main/resources/SLING-INF/", "");
                       }
                   }
               },
            all: ['src/main/resources/SLING-INF/libs/awesome/tests/**/*.html']
        },
        uglify: {
            options: {
                mangle: {
                    except: ['SlingAwesome2']
                },
                banner: "/******************************************************************************\n" +
                        " * ADOBE CONFIDENTIAL                                                         *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * Copyright 2015  Adobe Systems Incorporated                                 *\n" +
                        " * All Rights Reserved.                                                       *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * NOTICE:  All information contained herein is, and remains                  *\n" +
                        " * the property of Adobe Systems Incorporated and its suppliers,              *\n" +
                        " * if any.  The intellectual and technical concepts contained                 *\n" +
                        " * herein are proprietary to Adobe Systems Incorporated and its               *\n" +
                        " * suppliers and are protected by trade secret or copyright law.              *\n" +
                        " * Dissemination of this information or reproduction of this material         *\n" +
                        " * is strictly forbidden unless prior written permission is obtained          *\n" +
                        " * from Adobe Systems Incorporated.                                           *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * Please note that some portions of this project are written by third parties*\n" +
                        " * under different license terms. Your use of those portions are governed by  *\n" +
                        " * the license terms contained in the corresponding files.                    *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * SlingAwesome Client API                                                    *\n" +
                        " ******************************************************************************/\n"
            },
            slingawesome: {
                files: {
                    'src/main/resources/SLING-INF/libs/awesome/api/SlingAwesome.min.js': ['src/main/resources/SLING-INF/libs/awesome/api/SlingAwesome.js']
                }
            }
        },
        browserify: {
            browserifyOptions: {
              standalone: "SlingAwesome"
            },
            dist: {
                files: {
                    'src/main/resources/SLING-INF/libs/awesome/api/SlingAwesome.js': ['client/javascript/**/*.js']
                }
            }
        },
        watch: {
            javafiles: {
                files: ['src/**/*.java'],
                tasks: ['exec:install'],
                options: {
                    spawn: true,
                    livereload: true
                }
            },
            scripts: {
                files: ['client/**/*.js', 'src/**/*.html', 'src/**/tests/**/*.js'],
                tasks: ['browserify', 'exec:install', 'jsdoc', 'qunit'],
                options: {
                    spawn: true,
                    livereload: true
                }
            }
        },
        jsdoc : {
            dist : {
                src: ['client/**/*.js'],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');

};