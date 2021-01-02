function get(name) {
  const { cookie } = document;

  if (!cookie) {
    return name ? undefined : {};
  }

  const parsedCookie = cookie.split('; ').reduce((accumulator, item) => {
    const cookieItem = item.split('=');
    const cookieName = decodeURIComponent(cookieItem[0]);
    const cookieValue = decodeURIComponent(cookieItem[1]);

    accumulator[cookieName] = cookieValue;

    return accumulator;
  }, {});

  return name ? parsedCookie[name] : parsedCookie;
}

module.exports = get;
