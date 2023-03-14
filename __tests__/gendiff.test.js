import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const combinations = [
  ['file1.json', 'file2.json', undefined, 'result-stylish.txt'],
  ['file1.yaml', 'file2.yaml', undefined, 'result-stylish.txt'],
  ['file1.yml', 'file2.yml', undefined, 'result-stylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'result-stylish.txt'],
  ['file1.yml', 'file2.json', 'stylish', 'result-stylish.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'result-plain.txt'],
  ['file1.json', 'file2.yaml', 'plain', 'result-plain.txt'],
];

test.each(combinations)('genDiff extensions and format', (file1, file2, format, expected) => {
  const expectedDiff = fs.readFileSync(getFixturePath(expected), 'utf-8');
  const resultDiff = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  expect(resultDiff).toEqual(expectedDiff);
});
