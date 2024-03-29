import yaml from 'js-yaml';

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json': {
      return JSON.parse(data);
    }
    case 'yaml':
    case 'yml': {
      return yaml.load(data);
    }
    default: {
      throw new Error(`Unknown extension: '${dataType}'`);
    }
  }
};

export default parse;
