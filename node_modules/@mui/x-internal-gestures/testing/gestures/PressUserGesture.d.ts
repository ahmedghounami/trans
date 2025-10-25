import { PointerManager } from "../PointerManager.js";
import { PointerType } from "../types/Pointers.js";
import type { PressUserGestureOptions } from "./PressUserGesture.types.js";
/**
 * Implementation of the press gesture for testing.
 *
 * @param options - The options for the press gesture.
 * @param advanceTimers - Optional function to advance timers in tests.
 * @returns A promise that resolves when the press gesture is completed.
 */
export declare const press: <P extends PointerType>(pointerManager: PointerManager, options: PressUserGestureOptions<P>, advanceTimers?: (ms: number) => Promise<void>) => Promise<void>;