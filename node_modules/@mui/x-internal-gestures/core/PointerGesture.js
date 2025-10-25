"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointerGesture = void 0;
var _Gesture = require("./Gesture");
/**
 * Configuration options for pointer-based gestures, extending the base GestureOptions.
 *
 * These options provide fine-grained control over how pointer events are interpreted
 * and when the gesture should be recognized.
 */

/**
 * Base class for all pointer-based gestures.
 *
 * This class extends the base Gesture class with specialized functionality for
 * handling pointer events via the PointerManager. It provides common logic for
 * determining when a gesture should activate, tracking pointer movements, and
 * managing pointer thresholds.
 *
 * All pointer-based gesture implementations should extend this class rather than
 * the base Gesture class.
 *
 * @example
 * ```ts
 * import { PointerGesture } from './PointerGesture';
 *
 * class CustomGesture extends PointerGesture {
 *   constructor(options) {
 *     super(options);
 *   }
 *
 *   clone(overrides) {
 *     return new CustomGesture({
 *       name: this.name,
 *       // ... other options
 *       ...overrides,
 *     });
 *   }
 *
 *   handlePointerEvent(pointers, event) {
 *     // Handle pointer events here
 *   }
 * }
 * ```
 */
class PointerGesture extends _Gesture.Gesture {
  /** Function to unregister from the PointerManager when destroying this gesture */
  unregisterHandler = null;

  /** The original target element when the gesture began, used to prevent limbo state if target is removed */
  originalTarget = null;

  /**
   * Minimum number of simultaneous pointers required to activate the gesture.
   * The gesture will not start until at least this many pointers are active.
   */

  /**
   * Maximum number of simultaneous pointers allowed for this gesture.
   * If more than this many pointers are detected, the gesture may be canceled.
   */

  constructor(options) {
    super(options);
    this.minPointers = options.minPointers ?? 1;
    this.maxPointers = options.maxPointers ?? Infinity;
  }
  init(element, pointerManager, gestureRegistry, keyboardManager) {
    super.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.unregisterHandler = this.pointerManager.registerGestureHandler(this.handlePointerEvent.bind(this));
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.minPointers = options.minPointers ?? this.minPointers;
    this.maxPointers = options.maxPointers ?? this.maxPointers;
  }

  /**
   * Handler for pointer events from the PointerManager.
   * Concrete gesture implementations must override this method to provide
   * gesture-specific logic for recognizing and tracking the gesture.
   *
   * @param pointers - Map of active pointers by pointer ID
   * @param event - The original pointer event from the browser
   */

  /**
   * Calculate the target element for the gesture based on the active pointers.
   *
   * It takes into account the original target element.
   *
   * @param pointers - Map of active pointers by pointer ID
   * @param calculatedTarget - The target element calculated from getTargetElement
   * @returns A list of relevant pointers for this gesture
   */
  getRelevantPointers(pointers, calculatedTarget) {
    return pointers.filter(pointer => this.isPointerTypeAllowed(pointer.pointerType) && (calculatedTarget === pointer.target || pointer.target === this.originalTarget || calculatedTarget === this.originalTarget || 'contains' in calculatedTarget && calculatedTarget.contains(pointer.target)) || 'getRootNode' in calculatedTarget && calculatedTarget.getRootNode() instanceof ShadowRoot && pointer.srcEvent.composedPath().includes(calculatedTarget));
  }
  destroy() {
    if (this.unregisterHandler) {
      this.unregisterHandler();
      this.unregisterHandler = null;
    }
    super.destroy();
  }
}
exports.PointerGesture = PointerGesture;