import { Gesture } from "../../core/index.js";
import { AnyGesture } from "../AnyGesture.js";
import { SyncMatcherFn } from "../Matcher.types.js";
export type ToUpdateOptions<R = AnyGesture> = {
  /**
   * Asserts that the provided gesture options can be updated by emitting a change event
   * and that the options match the expected values.
   *
   * Internally it will:
   * 1. Instantiate the gesture twice
   * 2. Initialize one of the instances with a temporary element
   * 3. Emit a custom event named `${gestureName}ChangeOptions` with the expected options
   * 4. Verify that the options were properly updated
   * 5. Clean up resources by destroying the gesture and removing the temporary element
   *
   * This matcher is useful for verifying that gestures correctly handle runtime option updates.
   *
   * ## Requirements
   *
   * For this matcher to work correctly, the gesture must:
   * - Listen for events named `${gestureName}ChangeOptions`
   * - Implement the `updateOptions()` method to update its properties
   * - Have a working `destroy()` method to clean up resources
   *
   * @example
   * ```ts
   * expect(MoveGesture).toUpdateOptions({ preventDefault: true });
   * ```
   */
  toUpdateOptions<G = (R extends (new (...args: any[]) => infer J) ? (J extends Gesture<string> ? J : never) : never), ExpectedOptions extends Partial<G['mutableOptionsType']> = Partial<G['mutableOptionsType']>>(expectedOptions: ExpectedOptions): void;
};
export declare const toUpdateOptions: SyncMatcherFn;