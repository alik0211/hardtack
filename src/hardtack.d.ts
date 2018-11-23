export as namespace hardtack;

interface Options {
  path?: string,
  domain?: string,
  'max-age'?: number,
  expires?: string,
  secure?: boolean,
  samesite?: 'lax' | 'strict',
}

export function set(name: string, value: string, options: Options): string;

export function get(): object;

export function get(name: string): string | undefined;

export function remove(name: string, options: Options): string;
