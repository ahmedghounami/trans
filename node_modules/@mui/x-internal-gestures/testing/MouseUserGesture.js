"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mouseGesture = void 0;
var _MoveUserGesture = require("./gestures/MoveUserGesture");
var _PanUserGesture = require("./gestures/PanUserGesture");
var _PressUserGesture = require("./gestures/PressUserGesture");
var _TapUserGesture = require("./gestures/TapUserGesture");
var _TurnWheelUserGesture = require("./gestures/TurnWheelUserGesture");
var _UserGesture = require("./UserGesture");
var _createProxy = require("./utils/createProxy");
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
class MouseUserGesture extends _UserGesture.UserGesture {
  constructor() {
    super('mouse');
  }
  async tap(options) {
    return (0, _TapUserGesture.tap)(this.pointerManager, options, this.advanceTimers);
  }
  async press(options) {
    return (0, _PressUserGesture.press)(this.pointerManager, options, this.advanceTimers);
  }
  async move(options) {
    return (0, _MoveUserGesture.move)(this.pointerManager, options, this.advanceTimers);
  }
  async turnWheel(options) {
    return (0, _TurnWheelUserGesture.turnWheel)(this.pointerManager, options, this.advanceTimers);
  }
  async pan(options) {
    return (0, _PanUserGesture.pan)(this.pointerManager, options, this.advanceTimers);
  }
}

/**
 * Provides methods for tap, press, move, and wheel gestures with a mouse pointer.
 */
const mouseGesture = exports.mouseGesture = (0, _createProxy.createProxy)(new MouseUserGesture());