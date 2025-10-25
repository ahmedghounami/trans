import { PointerManager } from "../PointerManager.js";
import type { PointerType } from "../types/Pointers.js";
import { PanUserGestureOptions } from "./PanUserGesture.types.js";
/**
 * Implementation of the pan gesture.
 *
 * @param options - The options for the pan gesture.
 * @param advanceTimers - Optional function to advance timers in tests.
 * @returns A promise that resolves when the pan gesture is completed.
 */
export declare const pan: <P extends PointerType>(pointerManager: PointerManager, options: PanUserGestureOptions<P>, advanceTimers?: (ms: number) => Promise<void>) => Promise<void>;