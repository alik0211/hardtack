import set from './set';
import { merge } from './utils';

function remove(name) {
  const options = merge(arguments[1], {
    expires: 'Thu, 01 Jan 1970 00:00:01 GMT',
  });

  return set(name, '', options);
}

export default remove;
