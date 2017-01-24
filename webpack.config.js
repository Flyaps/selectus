'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var name = 'selectus';

var env = process.env.WEBPACK_ENV;
var plugins = [new ExtractTextPlugin(name + '.css')];
var filename = name;

if (env === 'build') {

   plugins.push(new webpack.DefinePlugin({
      'process.env': {
         'NODE_ENV': JSON.stringify('production')
      }
   }));

   plugins.push(new webpack.NoErrorsPlugin());

   plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
         warnings: false
      }
   }));

   filename += '.min.js';
} else {
   filename += '.js';
}


module.exports = {
   context: path.join(__dirname, 'src'),

   // The entry point for the bundle.
   entry: './index.js',

   // Options affecting the output.
   output: {
      path: path.join(__dirname, 'build'),
      // The filename of the entry chunk as relative path inside the output.path directory.
      filename: filename,
      library: name,
      libraryTarget: 'umd'
   },

   externals: {
      'jquery': {
         commonjs: 'jquery',
         commonjs2: 'jquery',
         amd: 'jquery',
         root: 'jQuery'
      }
   },

   watchOptions: {
      aggregateTimeout: 100
   },

   plugins: plugins,

   // Options affecting the resolving of modules.
   resolve: {
      // An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
      modulesDirectories: ['node_modules'],
      // An array of extensions that should be used to resolve modules.
      extensions: ['', '.js']
   },

   // Like resolve but for loaders.
   resolveLoader: {
      modulesDirectories: ['node_modules'],
      // It describes alternatives for the module name that are tried.
      moduleTemplates: ['*-loader'],
      extention: ['', '.js']
   },

   // Options affecting the normal modules
   module: {
      // A array of automatically applied loaders.
      loaders: [
         {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
               plugins: ['lodash'],
               presets: ['es2015']
            }
         },
         {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('style', 'css?-url&-import!postcss!stylus')
         }
      ]
   },

   postcss: function () {
      return [autoprefixer({
         browsers: ['> 3%']
      })];
   }

};