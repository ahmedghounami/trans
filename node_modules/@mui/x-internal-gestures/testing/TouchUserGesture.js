"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.touchGesture = void 0;
var _PanUserGesture = require("./gestures/PanUserGesture");
var _PinchUserGesture = require("./gestures/PinchUserGesture");
var _PressUserGesture = require("./gestures/PressUserGesture");
var _RotateUserGesture = require("./gestures/RotateUserGesture");
var _TapUserGesture = require("./gestures/TapUserGesture");
var _UserGesture = require("./UserGesture");
var _createProxy = require("./utils/createProxy");
/**
 * Used for providing a custom touch gesture.
 */

/**
 * Defines the touch gestures.
 * It includes a setup method to initialize global options.
 */

class TouchUserGesture extends _UserGesture.UserGesture {
  constructor() {
    super('touch');
  }
  async tap(options) {
    return (0, _TapUserGesture.tap)(this.pointerManager, options, this.advanceTimers);
  }
  async press(options) {
    return (0, _PressUserGesture.press)(this.pointerManager, options, this.advanceTimers);
  }
  async pinch(options) {
    return (0, _PinchUserGesture.pinch)(this.pointerManager, options, this.advanceTimers);
  }
  async pan(options) {
    return (0, _PanUserGesture.pan)(this.pointerManager, options, this.advanceTimers);
  }
  async rotate(options) {
    return (0, _RotateUserGesture.rotate)(this.pointerManager, options, this.advanceTimers);
  }
}

/**
 * Provides methods for tap, press, pinch, pan, and rotate gestures with touch pointers.
 */
const touchGesture = exports.touchGesture = (0, _createProxy.createProxy)(new TouchUserGesture());