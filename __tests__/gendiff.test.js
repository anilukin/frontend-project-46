import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const resultpath = getFixturePath('result.txt');

  const diff = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(resultpath, 'utf-8');

  expect(diff).toEqual(expected);
});

test('genDiff yaml', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const resultpath = getFixturePath('result.txt');

  const diff = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(resultpath, 'utf-8');

  expect(diff).toEqual(expected);
});

test('genDiff yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const resultpath = getFixturePath('result.txt');

  const diff = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(resultpath, 'utf-8');

  expect(diff).toEqual(expected);
});
