import { merge } from '../src/utils';

const options = {
  path: '/',
};

describe('merge', () => {
  test('return new object', () => {
    expect(merge(options)).not.toBe(options);
  });

  test('replace key values', () => {
    expect(merge(options, { path: '/other' })).toEqual({
      path: '/other',
    });
  });

  test('add key values', () => {
    expect(merge(options, { maxAge: 1337 })).toEqual({
      path: options.path,
      maxAge: 1337,
    });
  });
});
