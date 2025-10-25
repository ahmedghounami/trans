"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointerManager = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
class PointerManager {
  pointers = new Map();
  count = 0;
  constructor(mode) {
    this.mode = mode;
    this.clearPointers();
  }
  clearPointers() {
    this.pointers.clear();
    if (this.mode === 'mouse') {
      this.pointers.set(1, {
        id: 1,
        x: NaN,
        y: NaN,
        target: document.body
      });
    }
  }
  addPointers(pointer) {
    if (this.mode === 'mouse') {
      // Mouse mode only allows one pointer
      return;
    }
    if (Array.isArray(pointer)) {
      pointer.forEach(p => this.addPointers(p));
      return;
    }
    if (this.pointers.has(pointer.id)) {
      return;
    }
    this.pointers.set(pointer.id, pointer);
  }
  removePointers(id) {
    if (this.mode === 'mouse') {
      // Mouse pointer cannot be removed
      return;
    }
    if (Array.isArray(id)) {
      id.forEach(pointerId => this.pointers.delete(pointerId));
      return;
    }
    this.pointers.delete(id);
  }
  updatePointers(pointer) {
    if (Array.isArray(pointer)) {
      return pointer.map(p => this.updatePointers(p));
    }
    const existingPointer = this.pointers.get(pointer.id);
    if (!existingPointer) {
      throw new Error(`Pointer with id ${pointer.id} does not exist`);
    }
    const newPointer = (0, _extends2.default)({}, existingPointer, pointer);
    this.pointers.set(pointer.id, newPointer);
    if (newPointer.target === existingPointer.target) {
      return {
        pointer: newPointer
      };
    }
    const oldTarget = existingPointer.target;
    return {
      oldTarget,
      pointer: newPointer
    };
  }
  nextId() {
    this.count += 1;
    return 500 + this.count;
  }
  parseMousePointer(pointer, target) {
    if (this.mode !== 'mouse') {
      throw new Error('Mouse pointer can only be used in mouse mode');
    }

    // Get the existing mouse pointer (always id: 1)
    const existingPointer = this.pointers.get(1);
    const existingX = Number.isNaN(existingPointer?.x) ? undefined : existingPointer?.x;
    const existingY = Number.isNaN(existingPointer?.y) ? undefined : existingPointer?.y;
    const finalTarget = pointer?.target ?? target;
    const targetRect = finalTarget.getBoundingClientRect();

    // Use existing coordinates if available and not being overridden
    const x = pointer?.x ?? existingX ?? targetRect.left + targetRect.width / 2;
    const y = pointer?.y ?? existingY ?? targetRect.top + targetRect.height / 2;
    return {
      id: 1,
      x,
      y,
      target: finalTarget
    };
  }
  parsePointers(pointers, target, defaultConfig) {
    const normalizedPointers = Array.isArray(pointers) ? pointers : (0, _extends2.default)({}, defaultConfig, pointers);
    if (this.mode === 'mouse') {
      // If the mode is mouse, we only need one pointer
      if (Array.isArray(normalizedPointers) && normalizedPointers.length > 1 || !Array.isArray(normalizedPointers) && normalizedPointers.amount !== 1) {
        throw new Error('Mouse mode only supports one pointer');
      }
    }

    // Normalize pointers to be an array
    let pointersArray = [];
    if (!Array.isArray(normalizedPointers)) {
      const {
        amount,
        distance: pointerDistance,
        ids
      } = normalizedPointers;

      // Get the target element's bounding rect
      const targetRect = target.getBoundingClientRect();
      const centerX = targetRect.left + targetRect.width / 2;
      const centerY = targetRect.top + targetRect.height / 2;

      // Create pointers in a circle around the center of the target
      pointersArray = Array.from({
        length: amount
      }).map((_, index) => {
        const pointerId = ids?.[index] ?? this.nextId();
        const existingPointer = ids?.[index] ? this.pointers.get(ids[index]) : undefined;

        // Only calculate new positions if no existing position is available
        const angle = Math.PI * 2 * index / amount;
        const x = existingPointer?.x ?? centerX + Math.cos(angle) * pointerDistance / 2;
        const y = existingPointer?.y ?? centerY + Math.sin(angle) * pointerDistance / 2;
        return {
          id: pointerId,
          x,
          y,
          target
        };
      });
    } else {
      const allTargets = new Set(normalizedPointers.map(pointer => pointer.target ?? target));
      const targetRectMap = new Map(Array.from(allTargets).map(currentTarget => {
        const rect = currentTarget.getBoundingClientRect();
        return [currentTarget, {
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2
        }];
      }));
      pointersArray = normalizedPointers.map(pointer => {
        const pointerId = pointer.id ?? this.nextId();
        const existingPointer = pointer.id ? this.pointers.get(pointer.id) : undefined;
        return {
          id: pointerId,
          target: pointer.target ?? target,
          // Use existing coordinates if available and not being overridden
          x: pointer.x ?? existingPointer?.x ?? targetRectMap.get(pointer.target ?? target).centerX,
          y: pointer.y ?? existingPointer?.y ?? targetRectMap.get(pointer.target ?? target).centerY
        };
      });
    }
    this.addPointers(pointersArray);
    return pointersArray;
  }
  pointerEnter(pointer) {
    const over = new PointerEvent('pointerover', {
      bubbles: true,
      cancelable: true,
      composed: true,
      clientX: pointer.x,
      clientY: pointer.y,
      pointerId: pointer.id,
      pointerType: this.mode
    });
    const enter = new PointerEvent('pointerenter', {
      bubbles: false,
      cancelable: false,
      composed: true,
      clientX: pointer.x,
      clientY: pointer.y,
      pointerId: pointer.id,
      pointerType: this.mode
    });
    pointer.target.dispatchEvent(over);
    pointer.target.dispatchEvent(enter);
  }
  pointerLeave(pointer, oldTarget) {
    const out = new PointerEvent('pointerout', {
      bubbles: true,
      cancelable: true,
      composed: true,
      clientX: pointer.x,
      clientY: pointer.y,
      pointerId: pointer.id,
      pointerType: this.mode
    });
    const leave = new PointerEvent('pointerleave', {
      bubbles: false,
      cancelable: false,
      composed: true,
      clientX: pointer.x,
      clientY: pointer.y,
      pointerId: pointer.id,
      pointerType: this.mode
    });
    oldTarget.dispatchEvent(out);
    oldTarget.dispatchEvent(leave);
  }
  pointerDown(pointer) {
    if (this.pointers.get(pointer.id)?.isDown === true) {
      return;
    }
    const change = this.updatePointers((0, _extends2.default)({}, pointer, {
      isDown: true
    }));
    if (change?.oldTarget) {
      const {
        oldTarget,
        pointer: currentPointer
      } = change;
      this.pointerLeave(currentPointer, oldTarget);
      this.pointerEnter(currentPointer);
    }
    const event = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      composed: true,
      clientX: pointer.x,
      clientY: pointer.y,
      pointerId: pointer.id,
      pointerType: this.mode
    });
    pointer.target.dispatchEvent(event);
  }
  pointerMove(pointer) {
    const change = this.updatePointers(pointer);
    if (change?.oldTarget) {
      const {
        oldTarget,
        pointer: currentPointer
      } = change;
      this.pointerLeave(currentPointer, oldTarget);
      this.pointerEnter(currentPointer);
    }
    const event = new PointerEvent('pointermove', {
      bubbles: true,
      cancelable: true,
      composed: true,
      clientX: pointer.x,
      clientY: pointer.y,
      pointerId: pointer.id,
      pointerType: this.mode
    });
    pointer.target.dispatchEvent(event);
  }
  pointerUp(pointer) {
    // TODO: Only fire if all pointers are up
    const event = new PointerEvent('pointerup', {
      bubbles: true,
      cancelable: true,
      composed: true,
      clientX: pointer.x,
      clientY: pointer.y,
      pointerId: pointer.id,
      pointerType: this.mode
    });
    if (this.mode === 'mouse') {
      this.updatePointers((0, _extends2.default)({}, pointer, {
        isDown: false
      }));
    } else {
      this.removePointers(pointer.id);
    }
    pointer.target.dispatchEvent(event);
  }
}
exports.PointerManager = PointerManager;