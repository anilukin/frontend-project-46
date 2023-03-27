import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const result = _.sortBy(_.union(keys1, keys2)).map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'deleted',
        oldValue: obj1[key],
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        type: 'unchanged',
        valueType: 'complex',
        value: buildTree(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        key,
        type: 'unchanged',
        valueType: 'simple',
        value: obj1[key],
      };
    }
    return {
      key,
      type: 'changed',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
  return result;
};
export default buildTree;
