import { Gesture } from "../../core/index.js";
import { AnyGesture } from "../AnyGesture.js";
import { SyncMatcherFn } from "../Matcher.types.js";
export type ToBeClonable<R = AnyGesture> = {
  /**
   * Asserts that the provided gesture can be cloned and that the clone
   * has the same properties as the original gesture, or overridden properties
   * if specified.
   *
   * Internally it will:
   * 1. Instantiate the gesture
   * 2. Create a clone of the initial gesture
   * 3. Verify the clone is a different instance than the original
   * 4. Check that the clone has all required gesture properties and methods
   * 5. Ensure any provided overrides are correctly applied to the clone
   * 6. Verify that non-overridden properties match the original gesture
   *
   * This matcher is useful for ensuring that gestures can be properly duplicated
   * while maintaining their functionality and allowing customization.
   *
   * ## Requirements
   *
   * For this matcher to work correctly, the gesture must:
   * - Properly implement the `clone()` method to create a new instance
   * - Return a different instance than the original when cloned
   * - Apply any provided overrides to the cloned instance
   * - Maintain non-overridden property values from the original
   *
   * @example
   * ```ts
   * // Check if the gesture can be cloned with the same properties
   * expect(MoveGesture).toBeClonable();
   *
   * // Check if the gesture can be cloned with overridden properties
   * expect(MoveGesture).toBeClonable({ preventDefault: true });
   * ```
   */
  toBeClonable<G = (R extends (new (...args: any[]) => infer J) ? (J extends Gesture<string> ? J : never) : never), OverrideOptions extends Partial<G['mutableOptionsType']> = Partial<G['mutableOptionsType']>>(overrides?: OverrideOptions): void;
};
export declare const toBeClonable: SyncMatcherFn;