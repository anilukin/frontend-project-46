import parse from './parsers.js';
import stringify, { isObject } from './stylish.js';

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const result = {};

  for (const key of keys1) {
    if (!Object.hasOwn(obj2, key)) {
      result[key] = {
        type: 'deleted',
        oldValue: obj1[key],
      };
      continue;
    }
    if (obj1[key] === obj2[key]) {
      result[key] = {
        type: 'unchanged',
        valueType: 'simple',
        value: obj1[key],
      };
    } else if (isObject(obj1[key]) && isObject(obj2[key])) {
      result[key] = {
        type: 'unchanged',
        valueType: 'complex',
        value: getDiff(obj1[key], obj2[key]),
      };
    } else {
      result[key] = {
        type: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
  }

  for (const key of keys2) {
    if (!Object.hasOwn(obj1, key)) {
      result[key] = {
        type: 'added',
        value: obj2[key],
      };
    }
  }
  return result;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const diff = getDiff(obj1, obj2);
  return stringify(diff);
};

export default genDiff;
export { isObject };
