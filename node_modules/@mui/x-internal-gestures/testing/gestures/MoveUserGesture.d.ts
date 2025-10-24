import { PointerManager } from "../PointerManager.js";
import type { MoveUserGestureOptions } from "./MoveUserGesture.types.js";
/**
 * Implementation of the move gesture for testing.
 *
 * @param options - The options for the move gesture.
 * @param advanceTimers - Optional function to advance timers in tests.
 * @returns A promise that resolves when the move gesture is completed.
 */
export declare const move: (pointerManager: PointerManager, options: MoveUserGestureOptions, advanceTimers?: (ms: number) => Promise<void>) => Promise<void>;