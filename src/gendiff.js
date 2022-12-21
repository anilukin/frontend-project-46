import process from 'process';
import path from 'path';
import fs from 'fs';

const absPath = (filepath) => {
  const workDir = process.cwd();
  return path.resolve(workDir, filepath);
};

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const result = [];

  for (const key of keys1) {
    if (Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        result.push({
          type: 'unchanged',
          key,
          value: obj1[key],
        });
      } else {
        result.push({
          type: 'changed',
          key,
          oldValue: obj1[key],
          newValue: obj2[key],
        });
      }
    } else {
      result.push({
        type: 'deleted',
        key,
        oldValue: obj1[key],
      });
    }
  }
  for (const key of keys2) {
    if (!Object.hasOwn(obj1, key)) {
      result.push({
        type: 'added',
        key,
        value: obj2[key],
      });
    }
  }
  return result;
};

const printDiffObj = (diff) => {
  const result = {};
  diff.sort((a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  });
  const pushAdded = (k, v) => {
    result[`+ ${k}`] = v;
    return result;
  };
  const pushDeleted = (k, v) => {
    result[`- ${k}`] = v;
    return result;
  };
  const pushUnchanged = (k, v) => {
    result[`  ${k}`] = v;
    return result;
  };
  for (const item of diff) {
    if (item.type === 'added') {
      pushAdded(item.key, item.value);
    }
    if (item.type === 'deleted') {
      pushDeleted(item.key, item.oldValue);
    }
    if (item.type === 'unchanged') {
      pushUnchanged(item.key, item.value);
    }
    if (item.type === 'changed') {
      pushDeleted(item.key, item.oldValue);
      pushAdded(item.key, item.newValue);
    }
  }
  return JSON.stringify(result, null, 2);
};

const genDiff = (filepath1, filepath2) => {
  const absPath1 = absPath(filepath1);
  const absPath2 = absPath(filepath2);
  let result;
  if (!fs.existsSync(absPath1)) {
    result = console.log('Error! Check file 1!');
    return result;
  }
  if (!fs.existsSync(absPath2)) {
    result = console.log('Error! Check file 2!');
    return result;
  }
  const obj1 = JSON.parse(fs.readFileSync(absPath1));
  const obj2 = JSON.parse(fs.readFileSync(absPath2));
  const diff = getDiff(obj1, obj2);
  result = printDiffObj(diff);
  return result;
};

export default genDiff;
