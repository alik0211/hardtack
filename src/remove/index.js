const { set } = require('../set');
const { merge } = require('../utils');

function remove(name) {
  const options = merge(arguments[1], {
    expires: 'Thu, 01 Jan 1970 00:00:01 GMT',
  });

  return set(name, '', options);
}

module.exports = { remove };
