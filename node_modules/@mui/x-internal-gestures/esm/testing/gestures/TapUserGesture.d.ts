import { PointerManager } from "../PointerManager.js";
import { PointerType } from "../types/Pointers.js";
import type { TapUserGestureOptions } from "./TapUserGesture.types.js";
/**
 * Implementation of the tap gesture for testing.
 *
 * @param options - The options for the tap gesture.
 * @param advanceTimers - Optional function to advance timers in tests.
 * @returns A promise that resolves when the tap gesture is completed.
 */
export declare const tap: <P extends PointerType>(pointerManager: PointerManager, options: TapUserGestureOptions<P>, advanceTimers?: (ms: number) => Promise<void>) => Promise<void>;