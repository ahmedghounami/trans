/**
 * PressGesture - Detects press and hold interactions
 *
 * This gesture tracks when users press and hold on an element for a specified duration, firing events when:
 * - The press begins and passes the holding threshold time (start, ongoing)
 * - The press ends (end)
 * - The press is canceled by movement beyond threshold (cancel)
 *
 * This gesture is commonly used for contextual menus, revealing additional options, or alternate actions.
 */
import { GestureState } from "../Gesture.js";
import { PointerGesture, PointerGestureEventData, PointerGestureOptions } from "../PointerGesture.js";
import { PointerData } from "../PointerManager.js";
/**
 * Configuration options for PressGesture
 * Extends PointerGestureOptions with press-specific options
 */
export type PressGestureOptions<GestureName extends string> = PointerGestureOptions<GestureName> & {
  /**
   * Duration in milliseconds required to hold before the press gesture is recognized
   * @default 500
   */
  duration?: number;
  /**
   * Maximum distance in pixels that a pointer can move while pressing and still be considered a press
   * @default 10
   */
  maxDistance?: number;
};
/**
 * Event data specific to press gesture events
 * Contains information about the press location and duration
 */
export type PressGestureEventData<CustomData extends Record<string, unknown> = Record<string, unknown>> = PointerGestureEventData<CustomData> & {
  /** The x-coordinate of the press */
  x: number;
  /** The y-coordinate of the press */
  y: number;
  /** The duration of the press in milliseconds */
  duration: number;
};
/**
 * Type definition for the CustomEvent created by PressGesture
 */
export type PressEvent<CustomData extends Record<string, unknown> = Record<string, unknown>> = CustomEvent<PressGestureEventData<CustomData>>;
/**
 * State tracking for the PressGesture
 */
export type PressGestureState = GestureState & {
  /** The initial centroid position when the gesture began */
  startCentroid: {
    x: number;
    y: number;
  } | null;
  /** The most recent position during the gesture */
  lastPosition: {
    x: number;
    y: number;
  } | null;
  /** ID of the timer used to track press duration */
  timerId: ReturnType<typeof setTimeout> | null;
  /** Start time of the press (used to calculate duration) */
  startTime: number;
  /** Whether the press threshold duration has been reached */
  pressThresholdReached: boolean;
};
/**
 * PressGesture class for handling press/hold interactions
 *
 * This gesture detects when users press and hold on an element for a specified duration,
 * and dispatches press-related events when the user holds long enough.
 *
 * The `start` and `ongoing` events are dispatched at the same time once the press threshold is reached.
 * If the press is canceled (event.g., by moving too far), a `cancel` event is dispatched before the `end` event.
 */
export declare class PressGesture<GestureName extends string> extends PointerGesture<GestureName> {
  protected state: PressGestureState;
  protected readonly isSinglePhase: false;
  protected readonly eventType: PressEvent;
  protected readonly optionsType: PressGestureOptions<GestureName>;
  protected readonly mutableOptionsType: Omit<typeof this.optionsType, 'name'>;
  protected readonly mutableStateType: Omit<Partial<typeof this.state>, 'startCentroid' | 'lastPosition' | 'timerId' | 'startTime' | 'pressThresholdReached'>;
  /**
   * Duration in milliseconds required to hold before the press gesture is recognized
   */
  private duration;
  /**
   * Maximum distance a pointer can move for a gesture to still be considered a press
   */
  private maxDistance;
  constructor(options: PressGestureOptions<GestureName>);
  clone(overrides?: Record<string, unknown>): PressGesture<GestureName>;
  destroy(): void;
  protected updateOptions(options: typeof this.mutableOptionsType): void;
  protected resetState(): void;
  /**
   * Clear the press timer if it's active
   */
  private clearPressTimer;
  /**
   * Handle pointer events for the press gesture
   */
  protected handlePointerEvent(pointers: Map<number, PointerData>, event: PointerEvent): void;
  /**
   * Emit press-specific events with additional data
   */
  private emitPressEvent;
  /**
   * Cancel the current press gesture
   */
  private cancelPress;
}