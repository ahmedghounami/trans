"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateAverageDistance = calculateAverageDistance;
var _getDistance = require("./getDistance");
/**
 * Calculate the average distance between all pairs of pointers
 */
function calculateAverageDistance(pointers) {
  if (pointers.length < 2) {
    return 0;
  }
  let totalDistance = 0;
  let pairCount = 0;

  // Calculate distance between each pair of pointers
  for (let i = 0; i < pointers.length; i += 1) {
    for (let j = i + 1; j < pointers.length; j += 1) {
      totalDistance += (0, _getDistance.getDistance)({
        x: pointers[i].clientX,
        y: pointers[i].clientY
      }, {
        x: pointers[j].clientX,
        y: pointers[j].clientY
      });
      pairCount += 1;
    }
  }

  // Return average distance
  return pairCount > 0 ? totalDistance / pairCount : 0;
}