import { PointerManager } from "./PointerManager.js";
import { PointerType } from "./types/Pointers.js";
import { UserGesturePlugin } from "./types/UserGesturePlugin.js";
/**
 * Global user gesture options.
 */
export type UserGestureOptions = {
  /**
   * Custom function to replace setTimeout for advancing timers in tests.
   * Useful for testing with fake timers.
   * @param {number} ms - The number of milliseconds to advance timers by
   * @returns {Promise<void>} A promise that resolves when the timer has advanced
   */
  advanceTimers?: (ms: number) => Promise<void>;
  /**
   * Optional plugins to extend the functionality of the user gesture.
   * Each plugin should implement a specific gesture.
   */
  plugins?: UserGesturePlugin[];
};
export declare class UserGesture {
  protected pointerManager: PointerManager;
  protected advanceTimers?: (ms: number) => Promise<void>;
  /**
   * Creates a new UserGesture instance.
   */
  constructor(pointerType: PointerType);
  /**
   * Configures global options for the gestures.
   *
   * @param options - Global options for the gestures.
   * @returns This instance.
   */
  setup(options?: UserGestureOptions): this;
}