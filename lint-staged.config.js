// Since this module is set to use es6 thus module is giving error. Thus
// defining module as global before hand
module.exports = {
  '*.{ts,tsx,js,json,md}': [
    'yarn run lint:files',
    // Assuming prettier doesn't add any linting issues
    'prettier --write',
    // Checking if anything broke because of prettier
    'yarn run lint:files',
  ],
};
