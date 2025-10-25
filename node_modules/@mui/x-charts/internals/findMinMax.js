"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMinMax = findMinMax;
function findMinMax(data) {
  let min = Infinity;
  let max = -Infinity;
  for (const value of data ?? []) {
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }
  return [min, max];
}