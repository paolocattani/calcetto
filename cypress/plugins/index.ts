// require('cypress-watch-and-reload/plugins')
// Preprocessor
const webpack = require('@cypress/webpack-preprocessor');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

// Task
//const skipAndOnlyTask = require('cypress-skip-and-only-ui/task')
const coverageTask = require('@cypress/code-coverage/task');
const allTask = Object.assign({}, coverageTask)

module.exports = (on: any, config:any) => {
		initPlugin(on, config)
		require('@cypress/code-coverage/task')(on, config);

		on('file:preprocessor', webpack({webpackOptions : require('./webpack.config.js')}));
    on('task', allTask);

		return config;
};
