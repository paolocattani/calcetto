// https://eslint.org/docs/user-guide/configuring

module.exports = {
    //
    // parser :
    //      Specifies the ESLint parser.
    //      @typescript-eslint/parser - A parser that converts TypeScript into an ESTree-compatible form so it can be used in ESLint.
    //
    parser: '@typescript-eslint/parser',
    extends: [
        //'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        //'plugin:@typescript-eslint/recommended' // Uses the recommended rules from @typescript-eslint/eslint-plugin
        //'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:testing-library/react',
        //'prettier/react'
        'plugin:sonarjs/recommended',
    ],
    plugins: ['react', 'react-hooks', 'testing-library'],
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
            jsx: true, // Allows for the parsing of JSX
            impliedStrict: true,
            arrowFunctions: true
        }
    },
    rules: {
        'react/no-array-index-key': 'warn',
        'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.ts', '.tsx']}],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/destructuring-assignment': ['warn', 'always', {ignoreClassFields: true}],
        'react/prop-types': 0,

        // enable additional rules
        //indent: ['error', 2],
        'linebreak-style': ['error', 'windows'],
        quotes: ['warn', 'single'],
        semi: ['error', 'always'],
        // override default options for rules from base configurations
        //'comma-dangle': ['error', 'always'],
        'no-cond-assign': ['error', 'always'],
        // disable rules from base configurations
        'no-console': 'off',
    },
    settings: {
        react: {version: 'detect'}, // Tells eslint-plugin-react to automatically detect the version of React to use
        'import/resolver': {
            node: {extensions: ['.js', '.jsx', '.ts', '.tsx', 'html']},
        },
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
};
