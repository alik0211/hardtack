function merge() {
  const result = {};

  for (let i = 0; i < arguments.length; i++) {
    const attributes = arguments[i];

    for (const key in attributes) {
      result[key] = attributes[key];
    }
  }

  return result;
}

module.exports = { merge };
