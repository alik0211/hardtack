export default {
  set(name, value) {
    const options = Object.assign({}, arguments[2]);

    const optionsMap = {
      maxAge: 'max-age',
    };

    const attributes = Object.keys(options)
      .map(optionName => {
        const optionValue = options[optionName];

        if (optionValue === false) {
          return;
        }

        if (optionValue === true) {
          return `;${optionName}`;
        }

        return `;${
          optionName in optionsMap ? optionsMap[optionName] : optionName
        }=${String(optionValue).split(';')[0]}`;
      })
      .join('');

    return (document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}${attributes}`);
  },
  get(name) {
    if (!document.cookie) {
      return name ? undefined : {};
    }

    const parsedCookie = document.cookie
      .split('; ')
      .reduce((accumulator, item) => {
        const cookieItem = item.split('=');
        const cookieName = decodeURIComponent(cookieItem[0]);
        const cookieValue = decodeURIComponent(cookieItem[1]);

        accumulator[cookieName] = cookieValue;

        return accumulator;
      }, {});

    return name ? parsedCookie[name] : parsedCookie;
  },
  remove(name) {
    const options = Object.assign({}, arguments[1], {
      expires: 'Thu, 01 Jan 1970 00:00:01 GMT',
    });

    return this.set(name, '', options);
  },
};
