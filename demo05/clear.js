const path = require('path');
const rm = require('rimraf');

const out = path.resolve(__dirname, 'test');

try {
  rm(out, error => {
    if (error) throw error;
  });
} catch (error) {
  console.log('------------------------------------');
  console.log(error);
  console.log('------------------------------------');
  process.exit(1);
}
