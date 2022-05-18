import { shallowEqual } from './shallowEqual';

const isObject = (obj: object) =>
  obj && Object.prototype.toString.call(obj) === '[object Object]';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEmpty = (obj?: any) =>
  obj instanceof Date
    ? false
    : obj === '' || obj === null || obj === undefined || shallowEqual(obj, {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeEmpty = (object: any) =>
  Object.keys(object).reduce((acc, key) => {
    let child = object[key];

    if (isObject(object[key])) {
      child = removeEmpty(object[key]);
    }

    return isEmpty(child) ? acc : { ...acc, [key]: child };
  }, {});

export default removeEmpty;
