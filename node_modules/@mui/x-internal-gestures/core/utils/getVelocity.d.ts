import { PointerData } from "../PointerManager.js";
/**
 * Calculate the velocity of movement between two points
 */
export declare function getVelocity(startPointer: PointerData, endPointer: PointerData): {
  velocityX: number;
  velocityY: number;
  velocity: number;
};