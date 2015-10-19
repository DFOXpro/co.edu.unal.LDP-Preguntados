module.exports = function(grunt) {
	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			clean:["www/*"],
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
					dest: 'www/fonts/'
				},
				extraCSS: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: 'bower_components/Building-Blocks-gh-pages/style/',
					src: [
						'status/images/ui/*'
					],
					dest: 'www/status/images/ui/'
				},
				icons: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: 'bower_components/gaia-icons/',
					src: ['fonts/gaia-icons.ttf','gaia-icons.js'],
					dest: 'www/fonts/'
				},
				img: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: 'src/img/',
					src: [
						'*.png'
					],
					dest: 'www/img/'
				},
				devLib: {
					expand: true,
					filter: 'isFile',
					flatten: true,
					cwd: './bower_components/',
					src: [
						'angular/angular.js',
						'angular-route/angular-route.js',
						'angular-animate/angular-animate.js',
						'hammerjs/hammer.js'
					],
					dest: 'www/js/libs/'
				},
				devSrc: {
					expand: true,
					cwd: 'src/logica/',
					src: '**',
					dest: 'www/js/'
				},
				devManifest: {
					src: 'manifest.webapp',
					dest: 'www/'
				},
				datos: {
					src: '../preguntas.js',
					dest: 'www/'
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
						"www/index.html": 'src/vistas/main.jade'
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
						"dist/index.html": 'src/vistas/main.jade'
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
						'www/main.css': 'src/estilos/main.styl'
					}
				},
				prod: {
					options: {
						compress: true,
						'include css': true
					},
					files: {
						'dist/main.css': 'src/estilos/main.styl'
					}
				}
			},

			watch: {
				views: {
					files: ['src/vistas/**/*.jade','src/imagenes/**/*.svg'],
					tasks: ['jade:dev'],
					options: {
						livereload: true
					}
				},
				css: {
					files: 'src/estilos/**/*.styl',
					tasks: ['stylus:dev'],
					options: {
						livereload: true
					}
				},
				js: {
					files: 'src/logica/**/*.js',
					tasks: ['copy:devSrc'],
					options: {
						livereload: true
					}
				}
			}
	});


	// Default task(s).
	grunt.registerTask(
		'build', [
			'copy',
			'stylus:dev',
			'jade:dev'
		]
	);
	grunt.registerTask(
		'dev', [
			'build',
			'watch'
		]
	);
	grunt.registerTask('default', 'dev');
};