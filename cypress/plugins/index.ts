require('cypress-watch-and-reload/plugins')
const webpack = require('@cypress/webpack-preprocessor');
const skipAndOnly = require('cypress-skip-and-only-ui/task')

// const allTask = Object.assign({}, otherTask, task)

module.exports = (on: any) => {
    on('file:preprocessor', webpack({webpackOptions : require('./webpack.config.js')}));
    on('task', skipAndOnly);
};
