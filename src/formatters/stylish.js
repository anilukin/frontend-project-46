import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
export default (value) => {
  const stringify = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const keys = Object.keys(data);
    const getPrefix = replacer.repeat(spacesCount * depth);

    const result = keys.map((key) => {
      const item = data[key];
      if (!_.isObject(item)) {
        return `${getPrefix}${key}: ${item}`;
      }
      return `${getPrefix}${key}: ${stringify(item, depth + 1)}`;
    });
    return ['{', ...result, `${replacer.repeat(spacesCount * (depth - 1))}}`].join('\n');
  };

  const printInner = (data, depth) => {
    const getPrefix = replacer.repeat(spacesCount * depth - 2);
    const keys = Object.keys(data);
    const result = keys.reduce((acc, key) => {
      const item = data[key];
      if (item.type === 'added') {
        return [...acc, `${getPrefix}+ ${key}: ${stringify(item.value, depth + 1)}`];
      }
      if (item.type === 'deleted') {
        return [...acc, `${getPrefix}- ${key}: ${stringify(item.oldValue, depth + 1)}`];
      }
      if (item.type === 'unchanged') {
        if (item.valueType === 'simple') {
          return [...acc, `${getPrefix}  ${key}: ${stringify(item.value, depth + 1)}`];
        }
        return [...acc, `${getPrefix}  ${key}: ${printInner(item.value, depth + 1)}`];
      }
      return [...acc, `${getPrefix}- ${key}: ${stringify(item.oldValue, depth + 1)}`, `${getPrefix}+ ${key}: ${stringify(item.newValue, depth + 1)}`];
    }, ['{']);
    return [...result, `${replacer.repeat(spacesCount * (depth - 1))}}`].join('\n');
  };
  return printInner(value, 1);
};
