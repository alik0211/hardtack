const hardtack = require('../');

const user = {
  name: 'Ali',
  surname: 'Gasymov',
  symbols: ";,/?:@&=+$# -_.!~*'()",
  brackets: '()(())()',
};

const options = {
  path: '/',
  domain: 'alik0211.com',
  maxAge: 31536000,
  expires: 'Sun, 10 Jan 9999 00:00:00 GMT',
  samesite: 'lax',
};

describe('set', () => {
  test('set witout options', () => {
    expect(hardtack.set('name', user.name)).toBe(`name=${user.name}`);
  });

  test('set with iterable options', () => {
    expect(
      hardtack.set('name', user.name, {
        expires: options.expires,
      })
    ).toBe(`name=${user.name};expires=${options.expires}`);
  });

  test('set with maxAge', () => {
    expect(
      hardtack.set('name', user.name, {
        maxAge: options.maxAge,
      })
    ).toBe(`name=${user.name};max-age=${options.maxAge}`);
  });

  test('set with iterable options and secure', () => {
    expect(
      hardtack.set('surname', user.surname, {
        expires: options.expires,
        secure: true,
      })
    ).toBe(`surname=${user.surname};expires=${options.expires};secure`);
  });

  test('set value with forbidden characters', () => {
    expect(
      hardtack.set('symbols', user.symbols, {
        path: options.path,
      })
    ).toBe(`symbols=${encodeURIComponent(user.symbols)};path=${options.path}`);
  });

  test('set what is before the semicolon in the option value', () => {
    expect(
      hardtack.set('surname', user.surname, {
        path: `${options.path};expires=Thu, 01 Jan 1970 00:00:01 GMT`,
      })
    ).toBe(`surname=${user.surname};path=${options.path}`);
  });

  test('set cookie with brackets', () => {
    expect(hardtack.set('(brackets)', user.brackets)).toBe(
      `(brackets)=${user.brackets}`
    );
  });
});

describe('get', () => {
  test('get the value', () => {
    expect(hardtack.get('name')).toBe(user.name);
  });

  test('get cookie with brackets', () => {
    expect(hardtack.get('(brackets)')).toBe(user.brackets);
  });

  test('get without name return all cookies', () => {
    expect(hardtack.get()).toEqual({
      name: user.name,
      surname: user.surname,
      symbols: user.symbols,
      '(brackets)': user.brackets,
    });
  });

  test('get a non-existent value', () => {
    expect(hardtack.get('nothing')).toBe(undefined);
  });
});

describe('remove', () => {
  test('remove without options', () => {
    expect(hardtack.remove('name')).toBe(
      `name=;expires=Thu, 01 Jan 1970 00:00:01 GMT`
    );
  });

  test('remove cookie with brackets', () => {
    expect(hardtack.remove('(brackets)')).toBe(
      `(brackets)=;expires=Thu, 01 Jan 1970 00:00:01 GMT`
    );
  });

  test('remove despite the option expires', () => {
    expect(
      hardtack.remove('surname', {
        expires: options.expires,
      })
    ).toBe(`surname=;expires=Thu, 01 Jan 1970 00:00:01 GMT`);
  });

  test('remove despite the option path', () => {
    expect(
      hardtack.remove('symbols', {
        path: options.path,
      })
    ).toBe(
      `symbols=;path=${options.path};expires=Thu, 01 Jan 1970 00:00:01 GMT`
    );
  });

  test('do not change the original options object', () => {
    const immutableOptions = {
      path: options.path,
    };

    hardtack.remove('symbols', immutableOptions);

    expect(immutableOptions).toEqual({
      path: options.path,
    });
  });

  test('no values after remove', () => {
    expect(hardtack.get('name')).toBe(undefined);
    expect(hardtack.get('surname')).toBe(undefined);
    expect(hardtack.get('symbols')).toBe(undefined);

    expect(hardtack.get()).toEqual({});
  });
});
