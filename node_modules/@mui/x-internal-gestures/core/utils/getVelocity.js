"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVelocity = getVelocity;
/**
 * Calculate the velocity of movement between two points
 */
function getVelocity(startPointer, endPointer) {
  const timeElapsed = (endPointer.timeStamp - startPointer.timeStamp) / 1000; // in seconds
  if (timeElapsed === 0) {
    return {
      velocityX: 0,
      velocityY: 0,
      velocity: 0
    };
  }
  const velocityX = (endPointer.clientX - startPointer.clientX) / timeElapsed;
  const velocityY = (endPointer.clientY - startPointer.clientY) / timeElapsed;
  const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  return {
    velocityX,
    velocityY,
    velocity
  };
}