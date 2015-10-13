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
					dest: 'build/libs/',
				},
				devSrc: {
					expand: true,
					cwd: 'src/logica/',
					src: '**',
					dest: 'build/logica/',
				},
				devManifest: {
					src: 'manifest.webapp',
					dest: 'build/'
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
						"build/index.html": 'vistas/main.jade'
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
						"dist/index.html": 'vistas/main.jade'
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
						'build/main.css': 'estilos/main.styl'
					}
				},
				prod: {
					options: {
						compress: true,
						'include css': true
					},
					files: {
						'dist/main.css': 'estilos/main.styl'
					}
				}
			},

			watch: {
				views: {
					files: ['vistas/**/*.jade','imagenes/**/*.svg'],
					tasks: ['jade:dev'],
					options: {
						livereload: true
					}
				},
				css: {
					files: 'estilos/**/*.styl',
					tasks: ['stylus:dev'],
					options: {
						livereload: true
					}
				},
				js: {
					files: 'logica/**/*.js',
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