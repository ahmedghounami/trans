import { MoveUserGestureOptions, MoveUserGestureRoot } from "./gestures/MoveUserGesture.types.js";
import type { PanUserGestureOptions, PanUserGestureRoot } from "./gestures/PanUserGesture.types.js";
import { PressUserGestureOptions, PressUserGestureRoot } from "./gestures/PressUserGesture.types.js";
import { TapUserGestureOptions, TapUserGestureRoot } from "./gestures/TapUserGesture.types.js";
import { TurnWheelUserGestureOptions, TurnWheelUserGestureRoot } from "./gestures/TurnWheelUserGesture.types.js";
import { UserGesture, UserGestureOptions } from "./UserGesture.js";
/**
 * Used for providing a custom mouse gesture.
 */
export interface MouseUserGestureRootExtension {}
/**
 * Defines the mouse gestures.
 * It includes a setup method to initialize global options.
 */
export type MouseUserGestureRoot = {
  setup: (options: UserGestureOptions) => MouseUserGestureRoot;
} & TapUserGestureRoot<'mouse'> & PressUserGestureRoot<'mouse'> & MoveUserGestureRoot & PanUserGestureRoot<'mouse'> & TurnWheelUserGestureRoot & MouseUserGestureRootExtension;
/**
 * Class implementing mouse gestures for testing.
 * Provides methods for tap, press, move, and wheel gestures with a mouse pointer.
 */
declare class MouseUserGesture extends UserGesture implements MouseUserGestureRoot {
  constructor();
  tap(options: TapUserGestureOptions<'mouse'>): Promise<void>;
  press(options: PressUserGestureOptions<'mouse'>): Promise<void>;
  move(options: MoveUserGestureOptions): Promise<void>;
  turnWheel(options: TurnWheelUserGestureOptions): Promise<void>;
  pan(options: PanUserGestureOptions<'mouse'>): Promise<void>;
}
/**
 * Provides methods for tap, press, move, and wheel gestures with a mouse pointer.
 */
export declare const mouseGesture: MouseUserGesture;
export {};