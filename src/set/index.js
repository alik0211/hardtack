const { merge } = require('../utils');

function set(name, value) {
  const options = merge(arguments[2]);

  const attributes = Object.keys(options)
    .map((optionName) => {
      const optionValue = options[optionName];

      if (optionValue === true) {
        return `;${optionName}`;
      }

      const finalOptionName = optionName === 'maxAge' ? 'max-age' : optionName;
      const finalOptionValue = `${optionValue}`.split(';')[0];

      return `;${finalOptionName}=${finalOptionValue}`;
    })
    .join('');

  return (document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}${attributes}`);
}

module.exports = { set };
