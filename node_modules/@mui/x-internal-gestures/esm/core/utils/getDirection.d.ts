import type { Direction } from "../gestures/PanGesture.js";
/**
 * Get the direction of movement based on the current and previous positions
 */
export declare function getDirection(previous: {
  x: number;
  y: number;
}, current: {
  x: number;
  y: number;
}): Direction;