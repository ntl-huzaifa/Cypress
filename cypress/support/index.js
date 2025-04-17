const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    // webpackOptions: require('../../webpack.config.js'), // Update with the path to your Webpack config file
    webpackOptions: require('C:\Cypress\cypress\webpack.config.js'), // Update with the path to your Webpack config file
  };

  on('file:preprocessor', webpack(options));

  return config;
};
