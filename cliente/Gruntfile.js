module.exports = function(grunt) {
	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			clean:["build"],
			copy: {
				fonts: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: 'bower_components/fira/woff/',
					src: [
						'FiraSans-Regular.woff',
						'FiraSans-Medium.woff'
					],
					dest: 'build/fonts/',
				},
				extraCSS: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: 'bower_components/Building-Blocks-gh-pages/style/',
					src: [
						'status/images/ui/*'
					],
					dest: 'build/status/images/ui/',
				},
				icons: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: 'bower_components/gaia-icons/',
					src: ['fonts/gaia-icons.ttf','gaia-icons.js'],
					dest: 'build/fonts/',
				},
				img: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: 'src/img/',
					src: [
						'*.png'
					],
					dest: 'build/img/',
				},
				devLib: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: './bower_components/',
					src: [
						'angular/angular.min.js',
						'angular-route/angular-route.min.js',
						'angular-animate/angular-animate.min.js',
						'hammerjs/hammer.js'
					],
					dest: 'build/js/',
				},
				devSrc: {
					expand: true,
					cwd: 'src/js/',
					src: '**',
					dest: 'build/js/',
				},
				devManifest: {
					expand: true,
					cwd: 'src/',
					src: 'manifest.webapp',
					dest: 'build/',
				}
			},

			jade: {
				dev: {
					options: {
						pretty: true,
						data: {
							debug: true
						}
					},
					files: {
						"build/decoy.html": 'src/decoy.jade',
						"build/index.html": 'src/main.jade'
					}
				},
				prod: {
					options: {
						pretty: false,
						data: {
							debug: false
						}
					},
					files: {
						"build/index.html": 'src/decoy.jade',//decoy
						"build/index.html~": 'src/main.jade'//real app
					}
				}
			},

			stylus: {
				dev: {
					options: {
						compress: false,
						'include css': true
					},
					files: {
						'build/main.css': 'src/css/main.styl',
						'build/decoy.css': 'src/css/decoy.styl',
					//'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
					}
				}
			},

			watch: {
				views: {
					files: ['src/views/**/*.jade','src/views/**/*.svg'],
					tasks: ['jade:dev'],
					options: {
						livereload: true
					}
				},
				css: {
					files: 'src/css/*.styl',
					tasks: ['stylus:dev'],
					options: {
						livereload: true
					}
				},
				js: {
					files: 'src/js/**/*.js',
					tasks: ['copy:devSrc'],
					options: {
						livereload: true
					}
				}
			}
	});


	// Default task(s).
	grunt.registerTask(
		'dev', [
			'copy',
			'stylus:dev',
			'jade:dev',
			'watch'
		]
	);
	grunt.registerTask(
		'build', [
			'copy',
			'stylus:dev',
			'jade:dev'
		]
	);
	grunt.registerTask('default', 'dev');
};
