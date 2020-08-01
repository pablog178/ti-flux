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
				baseConfig: {
					extends: ['eslint:recommended'],
					settings: {
						sharedData: 'Hello'
					}
				},
				envs: ['node', 'mocha', 'es6', 'browser'],
				useEslintrc: false,
				globals: [
					'$',
					'_',
					'Alloy',
					'doLog',
					'doTest',
					'OS_ANDROID',
					'OS_IOS',
					'Ti'
				],
				rules: {}
			}
		}
	});

	grunt.loadNpmTasks('grunt-prettier');
	grunt.loadNpmTasks('grunt-eslint');

	grunt.registerTask('default', ['prettier', 'eslint']);
};
