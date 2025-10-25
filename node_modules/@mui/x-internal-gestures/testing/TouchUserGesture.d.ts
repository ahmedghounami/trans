import { PanUserGestureOptions, PanUserGestureRoot } from "./gestures/PanUserGesture.types.js";
import { PinchUserGestureOptions, PinchUserGestureRoot } from "./gestures/PinchUserGesture.types.js";
import { PressUserGestureOptions, PressUserGestureRoot } from "./gestures/PressUserGesture.types.js";
import { RotateUserGestureOptions, RotateUserGestureRoot } from "./gestures/RotateUserGesture.types.js";
import { TapUserGestureOptions, TapUserGestureRoot } from "./gestures/TapUserGesture.types.js";
import { UserGesture, UserGestureOptions } from "./UserGesture.js";
/**
 * Used for providing a custom touch gesture.
 */
export interface TouchUserGestureRootExtension {}
/**
 * Defines the touch gestures.
 * It includes a setup method to initialize global options.
 */
export type TouchUserGestureRoot = {
  setup: (options: UserGestureOptions) => TouchUserGestureRoot;
} & TapUserGestureRoot<'touch'> & PressUserGestureRoot<'touch'> & PinchUserGestureRoot & PanUserGestureRoot<'touch'> & RotateUserGestureRoot & TouchUserGestureRootExtension;
declare class TouchUserGesture extends UserGesture implements TouchUserGestureRoot {
  constructor();
  tap(options: TapUserGestureOptions<'touch'>): Promise<void>;
  press(options: PressUserGestureOptions<'touch'>): Promise<void>;
  pinch(options: PinchUserGestureOptions): Promise<void>;
  pan(options: PanUserGestureOptions<'touch'>): Promise<void>;
  rotate(options: RotateUserGestureOptions): Promise<void>;
}
/**
 * Provides methods for tap, press, pinch, pan, and rotate gestures with touch pointers.
 */
export declare const touchGesture: TouchUserGesture;
export {};