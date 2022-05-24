export const generateRandomString = (length = Math.abs(Math.random() * 16)) =>
  Math.random().toString(20).substr(2, length);
