import { PointerManager } from "../PointerManager.js";
import type { RotateUserGestureOptions } from "./RotateUserGesture.types.js";
/**
 * Implementation of the rotate gesture for testing.
 *
 * @param options - The options for the rotate gesture.
 * @param advanceTimers - Optional function to advance timers in tests.
 * @returns A promise that resolves when the rotate gesture is completed.
 */
export declare const rotate: (pointerManager: PointerManager, options: RotateUserGestureOptions, advanceTimers?: (ms: number) => Promise<void>) => Promise<void>;