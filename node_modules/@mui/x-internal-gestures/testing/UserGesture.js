"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserGesture = void 0;
var _PointerManager = require("./PointerManager");
/**
 * Global user gesture options.
 */

class UserGesture {
  /**
   * Creates a new UserGesture instance.
   */
  constructor(pointerType) {
    this.pointerManager = new _PointerManager.PointerManager(pointerType);
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
exports.UserGesture = UserGesture;