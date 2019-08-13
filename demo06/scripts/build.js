const path = require('path');
const Bundler = require('parcel-bundler');

const entryFile = path.resolve(__dirname, '..', 'index.html');

// Bundler 选项
const options = {
  outDir: './dist', // 将生成的文件放入输出目录下，默认为 dist
  outFile: 'index.html', // 输出文件的名称
  publicUrl: './', // 静态资源的 url ，默认为 '/'
  contentHash: true,
  minify: true, // 压缩文件，当 process.env.NODE_ENV === 'production' 时，会启用
};

(async () => {
  const bundler = new Bundler(entryFile, options);
  const bundle = await bundler.bundle();
})()