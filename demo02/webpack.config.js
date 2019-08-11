module.exports = {
  entry: {
    'bundle': './main.js',
    'bundle2': './main2.js'
  },
  output: {
    filename: '[name].js'
  },
  devServer: {
    port: 4000
  }
};
