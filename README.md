# hardtack

[![NPM](https://img.shields.io/npm/v/hardtack.svg?style=flat-square)](https://www.npmjs.com/package/hardtack)
[![GitHub Actions](https://img.shields.io/github/workflow/status/alik0211/hardtack/Unit%20tests/master?style=flat-square)](https://github.com/alik0211/hardtack/actions?query=branch%3Amaster)
[![Coverage Status](https://img.shields.io/coveralls/github/alik0211/hardtack/master.svg?style=flat-square)](https://coveralls.io/github/alik0211/hardtack?branch=master)

> An ultra-light library for working with cookies in JavaScript.

## Features

- Simple API
- Ultra-light (**395 bytes** minified and gzipped). No dependencies. [Size Limit](https://github.com/ai/size-limit) controls the size.
- Encoding of forbidden characters

## Table of contents

- [Quick start](#quick-start)
  - [Installation](#installation)
  - [Usage](#usage)
- [Methods](#methods)
  - [set(name: string, value: string, options)](#setname-string-value-string-options)
    - [options.path: string](#optionspath-string)
    - [options.domain: string](#optionsdomain-string)
    - [options.maxAge: number](#optionsmaxage-number)
    - [options.expires: string](#optionsexpires-string)
    - [options.secure: boolean](#optionssecure-boolean)
    - [options.samesite: string](#optionssamesite-string)
  - [get(name: string)](#getname-string)
  - [remove(name: string, options)](#removename-string-options)

## Quick start

### Installation
```sh
yarn add hardtack -E
# or
npm i hardtack -E
```

### Usage
```javascript
// Load the full library
import hardtack from 'hardtack';
// Load the necessary method
import get from 'hardtack/src/get';
import set from 'hardtack/src/set';
import remove from 'hardtack/src/remove';

hardtack.set('name', 'Ali', {
  path: '/',
  domain: 'gasymov.com',
  maxAge: 31536000, // 1 year
  samesite: 'lax'
});

hardtack.get(); // { name: 'Ali' };

hardtack.get('name'); // Ali;

hardtack.remove('name', {
  path: '/',
  domain: 'gasymov.com'
});
```

## Methods
### `set(name: string, value: string, options)`

Create a cookie

#### options.path: string

For example: `'/'`, `'/mydir'`

If not specified, defaults to the current path of the current document location.

#### options.domain: string

For example: `example.com` or `subdomain.example.com`

If not specified, this defaults to the host portion of the current document location. Contrary to earlier specifications, leading dots in domain names are ignored, but browsers may decline to set the cookie containing such dots. If a domain is specified, subdomains are always included.

#### options.maxAge: number

You can use `options['max-age']`, the result will be the same.

Max age in seconds. For example: `60*60*24*365` or `31536000` for a year

#### options.expires: string

Date in GMT format. See [Date.toUTCString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString) for help formatting this value.

#### options.secure: boolean

Cookie to only be transmitted over secure protocol as https.

#### options.samesite: string

SameSite prevents the browser from sending this cookie along with cross-site requests. Possible values for the flag are `lax` or `strict`.

More about the options of cookies on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie).

### `get(name: string)`

Get cookie value

### `remove(name: string, options)`

Remove cookie. When you delete a cookie, you **must** pass the same `options.path` and `options.domain` that you passed when you created the cookie.
