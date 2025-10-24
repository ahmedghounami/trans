import _extends from "@babel/runtime/helpers/esm/extends";
import { Gesture } from "../../core/index.js";
export class MockBadUpdateStateGesture extends Gesture {
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
    return new MockBadUpdateStateGesture(_extends({
      name: this.name
    }, overrides));
  }

  // Override updateState to prevent updates
  // This simulates a broken implementation
  updateState(_) {
    // Deliberately do nothing
  }
}