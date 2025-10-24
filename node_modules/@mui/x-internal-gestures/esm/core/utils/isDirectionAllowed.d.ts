import type { Direction } from "../gestures/PanGesture.js";
/**
 * Check if a direction matches one of the allowed directions
 */
export declare function isDirectionAllowed(direction: Direction, allowedDirections: Array<'up' | 'down' | 'left' | 'right'>): boolean;