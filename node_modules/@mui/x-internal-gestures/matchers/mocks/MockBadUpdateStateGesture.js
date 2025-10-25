"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockBadUpdateStateGesture = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _core = require("../../core");
class MockBadUpdateStateGesture extends _core.Gesture {
  state = {
    isDragging: false,
    startPosition: {
      x: 0,
      y: 0
    }
  };
  resetState() {
    this.state = {
      isDragging: false,
      startPosition: {
        x: 0,
        y: 0
      }
    };
  }
  clone(overrides) {
    return new MockBadUpdateStateGesture((0, _extends2.default)({
      name: this.name
    }, overrides));
  }

  // Override updateState to prevent updates
  // This simulates a broken implementation
  updateState(_) {
    // Deliberately do nothing
  }
}
exports.MockBadUpdateStateGesture = MockBadUpdateStateGesture;