const importAll = (context) => {
  return Array.from(context.keys());
}

const svgFiles = require.context('./icons/', false, /\.svg$/);

console.log(Array.from(svgFiles.keys()));

Array.from(svgFiles.keys()).forEach(item => {
  console.log(item);
});

console.log('------------------------------------');
console.log('------------------------------------');

const jsFiles = require.context('./test/', false, /.\js$/);
importAll(jsFiles).forEach(item => console.log(item));
