import { PointerManager } from "../PointerManager.js";
import type { PinchUserGestureOptions } from "./PinchUserGesture.types.js";
/**
 * Implementation of the pinch gesture for testing.
 *
 * @param options - The options for the pinch gesture.
 * @param advanceTimers - Optional function to advance timers in tests.
 * @returns A promise that resolves when the pinch gesture is completed.
 */
export declare const pinch: (pointerManager: PointerManager, options: PinchUserGestureOptions, advanceTimers?: (ms: number) => Promise<void>) => Promise<void>;