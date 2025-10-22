import { PointerManager } from "../PointerManager.js";
import type { TurnWheelUserGestureOptions } from "./TurnWheelUserGesture.types.js";
/**
 * Implementation of the turnWheel gesture for testing.
 *
 * @param options - The options for the turnWheel gesture.
 * @param advanceTimers - Optional function to advance timers in tests.
 * @returns A promise that resolves when the turnWheel gesture is completed.
 */
export declare const turnWheel: (pointerManager: PointerManager, options: TurnWheelUserGestureOptions, advanceTimers?: (ms: number) => Promise<void>) => Promise<void>;