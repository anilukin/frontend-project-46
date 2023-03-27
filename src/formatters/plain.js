import _ from 'lodash';

const printValue = (val) => {
  if (_.isObject(val)) {
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
    const result = data
      .map((item) => {
        if (item.type === 'unchanged' && item.valueType === 'complex') {
          return printInner(item.value, [...prefix, item.key]);
        }
        if (item.type === 'added') {
          return `Property '${printKey(item.key)}' was added with value: ${printValue(item.value)}`;
        }
        if (item.type === 'deleted') {
          return `Property '${printKey(item.key)}' was removed`;
        }
        if (item.type === 'changed') {
          return `Property '${printKey(item.key)}' was updated. From ${printValue(item.oldValue)} to ${printValue(item.newValue)}`;
        }
        return null;
      })
      .filter((el) => el !== null);
    return result.join('\n');
  };
  return printInner(value, []);
};
