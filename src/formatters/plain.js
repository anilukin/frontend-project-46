import { isObject } from './stylish.js';

const printValue = (val) => {
  if (isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return String(val);
};

export default (value) => {
  const printInner = (data, prefix) => {
    const printKey = (k) => [...prefix, k].join('.');
    const keys = Object.keys(data).sort();
    const result = keys
      .map((key) => {
        const item = data[key];
        if (item.type === 'unchanged' && item.valueType === 'complex') {
          return printInner(item.value, [...prefix, key]);
        }
        if (item.type === 'added') {
          return `Property '${printKey(key)}' was added with value: ${printValue(item.value)}`;
        }
        if (item.type === 'deleted') {
          return `Property '${printKey(key)}' was removed`;
        }
        if (item.type === 'changed') {
          return `Property '${printKey(key)}' was updated. From ${printValue(item.oldValue)} to ${printValue(item.newValue)}`;
        }
        return null;
      })
      .filter((el) => el !== null);
    return result.join('\n');
  };
  return printInner(value, []);
};
