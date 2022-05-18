import { shallowEqual } from './shallowEqual';

const isObject = (obj: any) =>
  obj && Object.prototype.toString.call(obj) === '[object Object]';

const isEmpty = (obj: any) =>
  obj instanceof Date
    ? false
    : obj === '' ||
    obj === null ||
    obj === undefined ||
    shallowEqual(obj, {});

const removeEmpty = (object: any) =>
  Object.keys(object).reduce((acc, key) => {
    let child = object[key];

    if (isObject(object[key])) {
      child = removeEmpty(object[key]);
    }

    return isEmpty(child) ? acc : { ...acc, [key]: child };
  }, {});

export default removeEmpty;
