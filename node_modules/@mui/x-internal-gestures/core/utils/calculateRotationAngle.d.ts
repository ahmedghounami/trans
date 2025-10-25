import { PointerData } from "../PointerManager.js";
/**
 * Calculate the rotation angle between pointers
 * This uses the angle between the first two pointers relative to the centroid
 */
export declare function calculateRotationAngle(pointers: PointerData[]): number;