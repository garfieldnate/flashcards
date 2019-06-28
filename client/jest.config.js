const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: 'jest-expo',
  testRegex: [
    ".*/test-.*\.[jt]sx?$",
  ],
  testMatch: null,
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: ['babel-preset-expo']
      },
    },
  },
  cacheDirectory: '.jest/cache',
  modulePaths: [
    "<rootDir>"
  ]
};
