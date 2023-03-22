const isObject = (data) => (typeof data === 'object' && data !== null);
const replacer = ' ';
const spacesCount = 4;
export default (value) => {
  const stringify = (data, depth) => {
    if (!isObject(data)) {
      return `${data}`;
    }
    const keys = Object.keys(data).sort();
    const result = ['{'];
    const getPrefix = replacer.repeat(spacesCount * depth);
    for (const key of keys) {
      const item = data[key];
      if (!isObject(item)) {
        result.push(`${getPrefix}${key}: ${item}`);
      } else {
        result.push(`${getPrefix}${key}: ${stringify(item, depth + 1)}`);
      }
    }
    result.push(`${replacer.repeat(spacesCount * (depth - 1))}}`);
    return result.join('\n');
  };

  const printInner = (data, depth) => {
    const getPrefix = replacer.repeat(spacesCount * depth - 2);
    const keys = Object.keys(data).sort();
    const result = ['{'];
    for (const key of keys) {
      const item = data[key];
      if (item.type === 'added') {
        result.push(`${getPrefix}+ ${key}: ${stringify(item.value, depth + 1)}`);
      }
      if (item.type === 'deleted') {
        result.push(`${getPrefix}- ${key}: ${stringify(item.oldValue, depth + 1)}`);
      }
      if (item.type === 'unchanged') {
        if (item.valueType === 'simple') {
          result.push(`${getPrefix}  ${key}: ${stringify(item.value, depth + 1)}`);
        } else {
          result.push(`${getPrefix}  ${key}: ${printInner(item.value, depth + 1)}`);
        }
      }
      if (item.type === 'changed') {
        result.push(`${getPrefix}- ${key}: ${stringify(item.oldValue, depth + 1)}`);
        result.push(`${getPrefix}+ ${key}: ${stringify(item.newValue, depth + 1)}`);
      }
    }
    result.push(`${replacer.repeat(spacesCount * (depth - 1))}}`);
    return result.join('\n');
  };
  return printInner(value, 1);
};
export { isObject };
