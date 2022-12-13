const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  target: "web",
  devServer: {
    port: "3000",
    static: ["./public"],
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use:[
            'style-loader',
            'css-loader'
        ]
      }
    ],
  },
  plugins : [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ]
};
