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

  const printInner2 = (data, depth) => {
    const getPrefix = replacer.repeat(spacesCount * depth - 2);
    const result = ['{'];
    data.forEach((item) => {
      if (item.type === 'added') {
        result.push(`${getPrefix}+ ${item.key}: ${stringify(item.value, depth + 1)}`);
      }
      if (item.type === 'deleted') {
        result.push(`${getPrefix}- ${item.key}: ${stringify(item.oldValue, depth + 1)}`);
      }
      if (item.type === 'unchanged') {
        if (item.valueType === 'simple') {
          result.push(`${getPrefix}  ${item.key}: ${stringify(item.value, depth + 1)}`);
        } else {
          result.push(`${getPrefix}  ${item.key}: ${printInner2(item.value, depth + 1)}`);
        }
      }
      if (item.type === 'changed') {
        result.push(`${getPrefix}- ${item.key}: ${stringify(item.oldValue, depth + 1)}`);
        result.push(`${getPrefix}+ ${item.key}: ${stringify(item.newValue, depth + 1)}`);
      }
    });
    result.push(`${replacer.repeat(spacesCount * (depth - 1))}}`);
    return result.join('\n');
  };
  return printInner2(value, 1);
};
