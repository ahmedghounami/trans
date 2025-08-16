/**
 * ActiveGesturesRegistry - Centralized registry for tracking which gestures are active on elements
 *
 * This singleton class keeps track of all gesture instances that are currently in their active state,
 * allowing both the system and applications to query which gestures are active on specific elements.
 */
import type { Gesture } from "./Gesture.js";
import { TargetElement } from "./types/TargetElement.js";
/**
 * Type for entries in the active gestures registry
 */
export type ActiveGestureEntry<GestureName extends string> = {
  /** The gesture instance that is active */
  gesture: Gesture<GestureName>;
  /** The element on which the gesture is active */
  element: TargetElement;
};
/**
 * Registry that maintains a record of all currently active gestures across elements
 */
export declare class ActiveGesturesRegistry<GestureName extends string> {
  /** Map of elements to their active gestures */
  private activeGestures;
  /**
   * Register a gesture as active on an element
   *
   * @param element - The DOM element on which the gesture is active
   * @param gesture - The gesture instance that is active
   */
  registerActiveGesture(element: TargetElement, gesture: Gesture<GestureName>): void;
  /**
   * Remove a gesture from the active registry
   *
   * @param element - The DOM element on which the gesture was active
   * @param gesture - The gesture instance to deactivate
   */
  unregisterActiveGesture(element: TargetElement, gesture: Gesture<GestureName>): void;
  /**
   * Get all active gestures for a specific element
   *
   * @param element - The DOM element to query
   * @returns Array of active gesture names
   */
  getActiveGestures(element: TargetElement): Record<string, boolean>;
  /**
   * Check if a specific gesture is active on an element
   *
   * @param element - The DOM element to check
   * @param gesture - The gesture instance to check
   * @returns True if the gesture is active on the element, false otherwise
   */
  isGestureActive(element: TargetElement, gesture: Gesture<GestureName>): boolean;
  /**
   * Clear all active gestures from the registry
   */
  destroy(): void;
  /**
   * Clear all active gestures for a specific element
   *
   * @param element - The DOM element to clear
   */
  unregisterElement(element: TargetElement): void;
}