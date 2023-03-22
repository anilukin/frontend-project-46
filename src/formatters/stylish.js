const isObject = (data) => (typeof data === 'object' && data !== null);
const replacer = ' ';
const spacesCount = 4;
export default (value) => {
  const stringify = (data, depth) => {
    if (!isObject(data)) {
      return `${data}`;
    }
    const keys = Object.keys(data).sort();
    let result = '{\n';
    const getPrefix = replacer.repeat(spacesCount * depth);
    for (const key of keys) {
      const item = data[key];
      if (!isObject(item)) {
        result += `${getPrefix}${key}: ${item}\n`;
      } else {
        result += `${getPrefix}${key}: ${stringify(item, depth + 1)}\n`;
      }
    }
    result += `${replacer.repeat(spacesCount * (depth - 1))}}`;
    return result;
  };

  const printInner = (data, depth) => {
    const getPrefix = replacer.repeat(spacesCount * depth - 2);
    const keys = Object.keys(data).sort();
    let result = '{\n';
    for (const key of keys) {
      const item = data[key];
      if (item.type === 'added') {
        result += `${getPrefix}+ ${key}: ${stringify(item.value, depth + 1)}\n`;
      }
      if (item.type === 'deleted') {
        result += `${getPrefix}- ${key}: ${stringify(item.oldValue, depth + 1)}\n`;
      }
      if (item.type === 'unchanged') {
        if (item.valueType === 'simple') {
          result += `${getPrefix}  ${key}: ${stringify(item.value, depth + 1)}\n`;
        } else {
          result += `${getPrefix}  ${key}: ${printInner(item.value, depth + 1)}\n`;
        }
      }
      if (item.type === 'changed') {
        result += `${getPrefix}- ${key}: ${stringify(item.oldValue, depth + 1)}\n`;
        result += `${getPrefix}+ ${key}: ${stringify(item.newValue, depth + 1)}\n`;
      }
    }
    result += `${replacer.repeat(spacesCount * (depth - 1))}}`;
    return result;
  };
  return printInner(value, 1);
};
export { isObject };
