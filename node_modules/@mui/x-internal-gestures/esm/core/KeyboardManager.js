/**
 * KeyboardManager - Manager for keyboard events in the gesture recognition system
 *
 * This class tracks keyboard state:
 * 1. Capturing and tracking all pressed keys
 * 2. Providing methods to check if specific keys are pressed
 */

/**
 * Type definition for keyboard keys
 */

/**
 * Class responsible for tracking keyboard state
 */
export class KeyboardManager {
  pressedKeys = (() => new Set())();

  /**
   * Create a new KeyboardManager instance
   */
  constructor() {
    this.initialize();
  }

  /**
   * Initialize the keyboard event listeners
   */
  initialize() {
    if (typeof window === 'undefined') {
      return;
    }

    // Add keyboard event listeners
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    // Reset keys when window loses focus
    window.addEventListener('blur', this.clearKeys);
  }

  /**
   * Handle keydown events
   */
  handleKeyDown = event => {
    this.pressedKeys.add(event.key);
  };

  /**
   * Handle keyup events
   */
  handleKeyUp = event => {
    this.pressedKeys.delete(event.key);
  };

  /**
   * Clear all pressed keys
   */
  clearKeys = () => {
    this.pressedKeys.clear();
  };

  /**
   * Check if a set of keys are all currently pressed
   * @param keys The keys to check
   * @returns True if all specified keys are pressed, false otherwise
   */
  areKeysPressed(keys) {
    if (!keys || keys.length === 0) {
      return true; // No keys required means the condition is satisfied
    }
    return keys.every(key => {
      if (key === 'ControlOrMeta') {
        return this.pressedKeys.has('Control') || this.pressedKeys.has('Meta');
      }
      return this.pressedKeys.has(key);
    });
  }

  /**
   * Cleanup method to remove event listeners
   */
  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('blur', this.clearKeys);
    }
    this.clearKeys();
  }
}