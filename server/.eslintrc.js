// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	//
	// parser :
	//      Specifies the ESLint parser.
	//      @typescript-eslint/parser - A parser that converts TypeScript into an ESTree-compatible form so it can be used in ESLint.
	//
	parser: '@typescript-eslint/parser',
	extends: [
		'prettier',
		'plugin:sonarjs/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parserOptions: {
		//
		// ecmaVersion :
		//      Set to 3, 5 (default), 6, 7, 8, 9, 10 or 11 to specify the version of ECMAScript syntax you want to use.
		//      You can also set to 2015 (same as 6), 2016 (same as 7), 2017 (same as 8), 2018 (same as 9), 2019 (same as 10) or 2020 (same as 11) to use the year-based naming
		//
		ecmaVersion: 2020,
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			modules: true,
			experimentalObjectRestSpread: true,
			templateStrings: true,
			destructuring: true,
			defaultParams: true,
			impliedStrict: true,
			arrowFunctions: true,
		},
	},
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		// enable additional rules
		//indent: ['error', 2],
		'linebreak-style': ['error', 'unix'],
		quotes: ['warn', 'single'],
		semi: ['error', 'always'],
		'no-cond-assign': ['error', 'always'],
		// disable rules from base configurations
		'no-console': 2,
	},
	settings: {
		'import/resolver': {
			node: { extensions: ['.js', '.ts'] },
		},
	},
	ignorePatterns: ['build', '*.test.ts'],
	env: {
		browser: false,
		commonjs: true,
		es6: true,
		node: true,
	},
};
