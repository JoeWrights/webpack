module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['svg-loader']
      }
    ]
  }
};
