const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config, env) {
    // Add Node polyfill plugin
    config.plugins.push(new NodePolyfillPlugin());
    
    // Don't split the runtime into a separate chunk
    config.optimization.runtimeChunk = false;
    
    return config;
} 