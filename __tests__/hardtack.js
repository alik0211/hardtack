import hardtack from '../src/hardtack';

const user = {
  name: 'Ali',
  surname: 'Gasymov',
  symbols: ';,/?:@&=+$# -_.!~*\'()'
};

const options = {
  path: '/',
  domain: 'alik0211.com',
  expires: 'Sun, 10 Jan 9999 00:00:00 GMT',
  samesite: 'lax'
};

describe('set', () => {
  test('set witout options', () => {
    expect(hardtack.set('name', user.name)).toBe(`name=${user.name}`);
  });

  test('set with iterable options', () => {
    expect(hardtack.set('name', user.name, {
      expires: options.expires,
    })).toBe(`name=${user.name};expires=${options.expires}`);
  });

  test('set with iterable options and secure', () => {
    expect(hardtack.set('surname', user.surname, {
      expires: options.expires,
      secure: true,
    })).toBe(`surname=${user.surname};expires=${options.expires};secure`);
  });

  test('set value with forbidden characters', () => {
    expect(hardtack.set('symbols', user.symbols)).toBe(`symbols=${encodeURIComponent(user.symbols)}`);
  });

  test('do not set options if false is passed', () => {
    expect(hardtack.set('surname', user.surname, {
      expires: false,
      secure: false,
    })).toBe(`surname=${user.surname}`);
  });
});

describe('get', () => {
  test('get the value', () => {
    expect(hardtack.get('name')).toBe(user.name);
  });

  test('get without name return all cookies', () => {
    expect(hardtack.get()).toEqual({
      name: user.name,
      surname: user.surname,
      symbols: user.symbols
    });
  });

  test('get a non-existent value', () => {
    expect(hardtack.get('nothing')).toBe(undefined);
  });
});

describe('remove', () => {
  test('remove without options', () => {
    expect(hardtack.remove('name')).toBe(`name=;expires=Thu, 01 Jan 1970 00:00:01 GMT`);
  });

  test('remove despite the option expires', () => {
    expect(hardtack.remove('surname', {
      expires: options.expires
    })).toBe(`surname=;expires=Thu, 01 Jan 1970 00:00:01 GMT`);
  });

  test('no values after remove', () => {
    expect(hardtack.get('name')).toBe(undefined);
    expect(hardtack.get('surname')).toBe(undefined);
  });
});
