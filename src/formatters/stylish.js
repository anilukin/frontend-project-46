import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

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

export default (value) => {
  const stylish = (data, depth) => {
    const getPrefix = replacer.repeat(spacesCount * depth - 2);
    const result = data.reduce((acc, item) => {
      if (item.type === 'added') {
        return [...acc, `${getPrefix}+ ${item.key}: ${stringify(item.value, depth + 1)}`];
      }
      if (item.type === 'deleted') {
        return [...acc, `${getPrefix}- ${item.key}: ${stringify(item.oldValue, depth + 1)}`];
      }
      if (item.type === 'unchanged') {
        if (item.valueType === 'simple') {
          return [...acc, `${getPrefix}  ${item.key}: ${stringify(item.value, depth + 1)}`];
        }
        return [...acc, `${getPrefix}  ${item.key}: ${stylish(item.value, depth + 1)}`];
      }
      return [...acc, `${getPrefix}- ${item.key}: ${stringify(item.oldValue, depth + 1)}`, `${getPrefix}+ ${item.key}: ${stringify(item.newValue, depth + 1)}`];
    }, ['{']);
    return [...result, `${replacer.repeat(spacesCount * (depth - 1))}}`].join('\n');
  };
  return stylish(value, 1);
};
