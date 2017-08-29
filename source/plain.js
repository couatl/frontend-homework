'use strict';

const plain = arrays => arrays.reduce(
  (a, b) => a.concat(Array.isArray(b) ? plain(b) : b), []
);
