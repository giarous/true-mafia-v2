module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {files: ['__tests__/**/*.js', 'jest.setup.js'], env: {jest: true}},
  ],
};
