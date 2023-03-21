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
  switch (extension) {
    case 'json': {
      return JSON.parse(fs.readFileSync(absPathFile));
    }
    case 'yaml':
    case 'yml': {
      return yaml.load(fs.readFileSync(absPathFile));
    }
    default: {
      throw new Error(`Unknown extension: '${extension}'`);
    }
  }
};

export { absPath };
export default parse;
