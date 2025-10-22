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
export type KeyboardKey = AllKeys | (string & {});
type AllNumbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type AllLetters = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
type AllMeta = 'Shift' | 'Control' | 'Alt' | 'Meta' | 'ControlOrMeta';
type AllKeys = AllMeta | AllLetters | AllNumbers;
/**
 * Class responsible for tracking keyboard state
 */
export declare class KeyboardManager {
  private pressedKeys;
  /**
   * Create a new KeyboardManager instance
   */
  constructor();
  /**
   * Initialize the keyboard event listeners
   */
  private initialize;
  /**
   * Handle keydown events
   */
  private handleKeyDown;
  /**
   * Handle keyup events
   */
  private handleKeyUp;
  /**
   * Clear all pressed keys
   */
  private clearKeys;
  /**
   * Check if a set of keys are all currently pressed
   * @param keys The keys to check
   * @returns True if all specified keys are pressed, false otherwise
   */
  areKeysPressed(keys?: KeyboardKey[]): boolean;
  /**
   * Cleanup method to remove event listeners
   */
  destroy(): void;
}
export {};