import { isObject } from './stylish.js';

export default (value) => {
  const printValue = (val) => {
    if (isObject(val)) {
      return '[complex value]';
    }
    if (typeof val === 'string') {
      return `'${val}'`;
    }
    return val;
  };
  const printInner = (data, prefix) => {
    const printKey = (k) => [...prefix, k].join('.');
    const keys = Object.keys(data).sort();
    const result = [];
    for (const key of keys) {
      const item = data[key];
      if (item.type === 'unchanged' && item.valueType === 'complex') {
        result.push(printInner(item.value, [...prefix, key]));
      }
      if (item.type === 'added') {
        result.push(`Property '${printKey(key)}' was added with value: ${printValue(item.value)}`);
      }
      if (item.type === 'deleted') {
        result.push(`Property '${printKey(key)}' was removed`);
      }
      if (item.type === 'changed') {
        result.push(`Property '${printKey(key)}' was updated. From ${printValue(item.oldValue)} to ${printValue(item.newValue)}`);
      }
    }
    return result.join('\n');
  };
  return printInner(value, []);
};
