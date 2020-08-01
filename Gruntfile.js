var child_process = require('child_process');

module.exports = function (grunt) {
	// Configure the plugins
	grunt.initConfig({
		prettier: {
			// ,'app/styles/login/loginWindow.tss' TODO: Beautify TSS files
			files: {
				src: [
					'.jsbeautifyrc',
					'.jscsrc',
					'.jshintrc',
					'tiapp.xml',
					'Gruntfile.js',
					'app/controllers/**/*.js',
					'app/models/*.js',
					'app/lib/**/*.js',
					'app/views/**/*.xml',
					'app/i18n/**/*.xml',
					'app/alloy.js',
					'!app/lib/external/**/*.*'
				]
			},
			options: {
				useTabs: true,
				singleQuote: true
			}
		},
		eslint: {
			target: [
				'Gruntfile.js',
				'app/controllers/**/*.js',
				'app/models/*.js',
				'app/lib/**/*.js',
				'app/alloy.js',
				'!app/lib/external/**/*.*'
			],
			options: {
				extends: ['node']
			}
		}
	});

	grunt.loadNpmTasks('grunt-prettier');
	grunt.loadNpmTasks('grunt-eslint');

	grunt.registerTask('default', ['prettier', 'eslint']);
};
