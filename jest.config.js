module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // roots: [
  //   '<rootDir>/kcd-webhook-service'
  // ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '.*\\.test\\.ts$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
};
