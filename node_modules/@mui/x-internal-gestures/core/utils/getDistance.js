"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDistance = getDistance;
/**
 * Calculate the distance between two points
 */
function getDistance(pointA, pointB) {
  const deltaX = pointB.x - pointA.x;
  const deltaY = pointB.y - pointA.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}