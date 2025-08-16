import { PointerData } from "../PointerManager.js";
/**
 * Calculate the centroid (average position) of multiple pointers
 */
export declare function calculateCentroid(pointers: PointerData[]): {
  x: number;
  y: number;
};