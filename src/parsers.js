import fs from 'fs';
import process from 'process';
import path from 'path';
import yaml from 'js-yaml';

const absPath = (filepath) => {
  const workDir = process.cwd();
  return path.resolve(workDir, filepath);
};

const parse = (filepath) => {
  const [, extension] = filepath.split('.');
  const absPathFile = absPath(filepath);
  let obj;
  switch (extension) {
    case 'json': {
      obj = JSON.parse(fs.readFileSync(absPathFile));
      break;
    }
    case 'yaml':
    case 'yml': {
      obj = yaml.load(fs.readFileSync(absPathFile));
      break;
    }
    default: {
      throw new Error(`Unknown extension: '${extension}'`);
    }
  }
  return obj;
};

export { absPath };
export default parse;
