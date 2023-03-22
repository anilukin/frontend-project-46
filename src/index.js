import process from 'process';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import printDiff from './formatters/index.js';
import buildTree from './buildTree.js';

const absPath = (filepath) => {
  const workDir = process.cwd();
  return path.resolve(workDir, filepath);
};

const getData = (filepath) => fs.readFileSync(absPath(filepath));

const getDataType = (filepath) => {
  const [, dataType] = filepath.split('.');
  return dataType;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(getData(filepath1), getDataType(filepath1));
  const obj2 = parse(getData(filepath2), getDataType(filepath2));
  const diff = buildTree(obj1, obj2);
  return printDiff(diff, formatName);
};

export default genDiff;
