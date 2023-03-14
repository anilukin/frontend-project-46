const isObject = (data) => (typeof data === 'object' && data !== null);
const replacer = ' ';
const spacesCount = 4;
export default (value) => {
  const printValue = (data, depth) => {
    if (!isObject(data)) {
      return `${data}`;
    }
    const keys = Object.keys(data).sort();
    let result = '{\n';
    const prefix = replacer.repeat(spacesCount * depth);
    for (const key of keys) {
      const item = data[key];
      if (!isObject(item)) {
        result += `${prefix}${key}: ${item}\n`;
      } else {
        result += `${prefix}${key}: ${printValue(item, depth + 1)}\n`;
      }
    }
    result += `${replacer.repeat(spacesCount * (depth - 1))}}`;
    return result;
  };

  const printInner = (data, depth) => {
    const prefix = replacer.repeat(spacesCount * depth - 2);
    const keys = Object.keys(data).sort();
    let result = '{\n';
    for (const key of keys) {
      const item = data[key];
      if (item.type === 'added') {
        result += `${prefix}+ ${key}: ${printValue(item.value, depth + 1)}\n`;
      }
      if (item.type === 'deleted') {
        result += `${prefix}- ${key}: ${printValue(item.oldValue, depth + 1)}\n`;
      }
      if (item.type === 'unchanged') {
        if (item.valueType === 'simple') {
          result += `${prefix}  ${key}: ${printValue(item.value, depth + 1)}\n`;
        } else {
          result += `${prefix}  ${key}: ${printInner(item.value, depth + 1)}\n`;
        }
      }
      if (item.type === 'changed') {
        result += `${prefix}- ${key}: ${printValue(item.oldValue, depth + 1)}\n`;
        result += `${prefix}+ ${key}: ${printValue(item.newValue, depth + 1)}\n`;
      }
    }
    result += `${replacer.repeat(spacesCount * (depth - 1))}}`;
    return result;
  };
  return printInner(value, 1);
};
export { isObject };
