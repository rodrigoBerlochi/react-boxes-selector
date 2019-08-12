'use strict';

const webpack = require('webpack');
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/ReactBoxesSelector.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "react-boxes-selector.js",
    library: "reactBoxesSelector",
    libraryTarget: "commonjs2"
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"]
          }
        }
      }
    ]
  }
};
