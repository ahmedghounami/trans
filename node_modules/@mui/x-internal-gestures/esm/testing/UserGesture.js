import { PointerManager } from "./PointerManager.js";

/**
 * Global user gesture options.
 */

export class UserGesture {
  /**
   * Creates a new UserGesture instance.
   */
  constructor(pointerType) {
    this.pointerManager = new PointerManager(pointerType);
  }

  /**
   * Configures global options for the gestures.
   *
   * @param options - Global options for the gestures.
   * @returns This instance.
   */
  setup(options) {
    // Preserve advanceTimers if it was set previously and not overridden
    if (options?.advanceTimers !== undefined) {
      this.advanceTimers = options.advanceTimers;
    }

    // Register plugins if provided
    options?.plugins?.forEach(plugin => {
      // @ts-expect-error, we are using a dynamic key
      if (this[plugin.name]) {
        throw new Error(`Plugin with name "${plugin.name}" already exists. Please use a unique name.`);
      }
      // @ts-expect-error, we are using a dynamic key
      this[plugin.name] = newOptions => plugin.gesture(this.pointerManager, newOptions, this.advanceTimers);
    });
    return this;
  }
}