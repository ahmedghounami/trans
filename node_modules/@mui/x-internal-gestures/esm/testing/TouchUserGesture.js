import { pan } from "./gestures/PanUserGesture.js";
import { pinch } from "./gestures/PinchUserGesture.js";
import { press } from "./gestures/PressUserGesture.js";
import { rotate } from "./gestures/RotateUserGesture.js";
import { tap } from "./gestures/TapUserGesture.js";
import { UserGesture } from "./UserGesture.js";
import { createProxy } from "./utils/createProxy.js";

/**
 * Used for providing a custom touch gesture.
 */

/**
 * Defines the touch gestures.
 * It includes a setup method to initialize global options.
 */

class TouchUserGesture extends UserGesture {
  constructor() {
    super('touch');
  }
  async tap(options) {
    return tap(this.pointerManager, options, this.advanceTimers);
  }
  async press(options) {
    return press(this.pointerManager, options, this.advanceTimers);
  }
  async pinch(options) {
    return pinch(this.pointerManager, options, this.advanceTimers);
  }
  async pan(options) {
    return pan(this.pointerManager, options, this.advanceTimers);
  }
  async rotate(options) {
    return rotate(this.pointerManager, options, this.advanceTimers);
  }
}

/**
 * Provides methods for tap, press, pinch, pan, and rotate gestures with touch pointers.
 */
export const touchGesture = createProxy(new TouchUserGesture());