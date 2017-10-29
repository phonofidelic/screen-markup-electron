const webpack = require('webpack');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.module.plugins.push(
		new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ])
  )
  return config;
}