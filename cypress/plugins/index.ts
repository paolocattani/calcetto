const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on: any) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
};
