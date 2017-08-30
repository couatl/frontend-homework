'use strict';

const plain = arrays => arrays.reduce(
  (accumulator, currentValue) => accumulator.concat(Array.isArray(currentValue) ? plain(currentValue) : currentValue), []
);
