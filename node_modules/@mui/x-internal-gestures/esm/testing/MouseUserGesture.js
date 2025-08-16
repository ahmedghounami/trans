import { move } from "./gestures/MoveUserGesture.js";
import { pan } from "./gestures/PanUserGesture.js";
import { press } from "./gestures/PressUserGesture.js";
import { tap } from "./gestures/TapUserGesture.js";
import { turnWheel } from "./gestures/TurnWheelUserGesture.js";
import { UserGesture } from "./UserGesture.js";
import { createProxy } from "./utils/createProxy.js";

/**
 * Used for providing a custom mouse gesture.
 */

/**
 * Defines the mouse gestures.
 * It includes a setup method to initialize global options.
 */

/**
 * Class implementing mouse gestures for testing.
 * Provides methods for tap, press, move, and wheel gestures with a mouse pointer.
 */
class MouseUserGesture extends UserGesture {
  constructor() {
    super('mouse');
  }
  async tap(options) {
    return tap(this.pointerManager, options, this.advanceTimers);
  }
  async press(options) {
    return press(this.pointerManager, options, this.advanceTimers);
  }
  async move(options) {
    return move(this.pointerManager, options, this.advanceTimers);
  }
  async turnWheel(options) {
    return turnWheel(this.pointerManager, options, this.advanceTimers);
  }
  async pan(options) {
    return pan(this.pointerManager, options, this.advanceTimers);
  }
}

/**
 * Provides methods for tap, press, move, and wheel gestures with a mouse pointer.
 */
export const mouseGesture = createProxy(new MouseUserGesture());