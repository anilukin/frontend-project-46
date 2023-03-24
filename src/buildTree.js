import { isObject } from './formatters/stylish.js';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set([...keys1, ...keys2])];

  const result = allKeys.reduce((acc, key) => {
    const newAcc = { ...acc };
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      newAcc[key] = {
        type: 'deleted',
        oldValue: obj1[key],
      };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      newAcc[key] = {
        type: 'added',
        value: obj2[key],
      };
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        newAcc[key] = {
          type: 'unchanged',
          valueType: 'simple',
          value: obj1[key],
        };
      } else if (isObject(obj1[key]) && isObject(obj2[key])) {
        newAcc[key] = {
          type: 'unchanged',
          valueType: 'complex',
          value: buildTree(obj1[key], obj2[key]),
        };
      } else {
        newAcc[key] = {
          type: 'changed',
          oldValue: obj1[key],
          newValue: obj2[key],
        };
      }
    }
    return newAcc;
  }, {});
  return result;
};
export default buildTree;
