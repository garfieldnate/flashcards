#!/usr/bin/env node
// tslint:disable:no-console
import * as fs from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';
import * as path from 'path';

const schemaDir = path.join(__dirname, '..', 'src', 'db', 'schemata');

console.log(`Reading schemata directory ${schemaDir}`);
fs.readdir(schemaDir, (err, files) => {
  if (err) {
    return console.log(`Unable to scan directory: ${schemaDir}: ${err}`);
  }
  files
    .filter((f) => path.extname(f) === '.json')
    .forEach((jsonFile) => {
      const jsonPath = path.join(schemaDir, jsonFile);
      const tsFile = path.basename(jsonFile, '.json') + '.ts';
      const tsPath = path.join(schemaDir, tsFile);

      console.log(`Converting ${jsonFile} to ${tsFile}`);
      compileFromFile(jsonPath).then((ts) => {
        fs.writeFileSync(tsPath, ts);
      });
    });
});
