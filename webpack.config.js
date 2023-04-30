const path = require("path");
const webpack = require("webpack");
// create a module. exports object and enter the entry and the output paths inside the object
module.exports = {
entry: './assets/js/script.js',
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  // we need to tell the plugins what plugins we want to use
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
  ],
  mode: 'development'
};
