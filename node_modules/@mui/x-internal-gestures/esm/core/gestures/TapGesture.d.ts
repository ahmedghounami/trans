/**
 * TapGesture - Detects tap (quick touch without movement) gestures
 *
 * This gesture tracks simple tap interactions on elements, firing a single event when:
 * - A complete tap is detected (pointerup after brief touch without excessive movement)
 * - The tap is canceled (event.g., moved too far or held too long)
 */
import { GestureState } from "../Gesture.js";
import { PointerGesture, PointerGestureEventData, PointerGestureOptions } from "../PointerGesture.js";
import { PointerData } from "../PointerManager.js";
/**
 * Configuration options for TapGesture
 * Extends PointerGestureOptions with tap-specific settings
 */
export type TapGestureOptions<GestureName extends string> = PointerGestureOptions<GestureName> & {
  /**
   * Maximum distance in pixels a pointer can move for the gesture to still be considered a tap
   * @default 10
   */
  maxDistance?: number;
  /**
   * Number of consecutive taps to detect (for double-tap, triple-tap)
   * @default 1
   */
  taps?: number;
};
/**
 * Event data specific to tap gesture events
 * Contains information about the tap location and counts
 */
export type TapGestureEventData<CustomData extends Record<string, unknown> = Record<string, unknown>> = PointerGestureEventData<CustomData> & {
  /** X coordinate of the tap */
  x: number;
  /** Y coordinate of the tap */
  y: number;
  /** Current count of taps in a sequence */
  tapCount: number;
};
/**
 * Type definition for the CustomEvent created by TapGesture
 */
export type TapEvent<CustomData extends Record<string, unknown> = Record<string, unknown>> = CustomEvent<TapGestureEventData<CustomData>>;
/**
 * State tracking for the TapGesture
 */
export type TapGestureState = GestureState & {
  /** The initial centroid position when the gesture began */
  startCentroid: {
    x: number;
    y: number;
  } | null;
  /** Current count of consecutive taps */
  currentTapCount: number;
  /** Timestamp of the last tap */
  lastTapTime: number;
  /** The most recent centroid position during the gesture */
  lastPosition: {
    x: number;
    y: number;
  } | null;
};
/**
 * TapGesture class for handling tap interactions
 *
 * This gesture detects when users tap on elements without significant movement,
 * and can recognize single taps, double taps, or other multi-tap sequences.
 */
export declare class TapGesture<GestureName extends string> extends PointerGesture<GestureName> {
  protected state: TapGestureState;
  protected readonly isSinglePhase: true;
  protected readonly eventType: TapEvent;
  protected readonly optionsType: TapGestureOptions<GestureName>;
  protected readonly mutableOptionsType: Omit<typeof this.optionsType, 'name'>;
  protected readonly mutableStateType: never;
  /**
   * Maximum distance a pointer can move for a gesture to still be considered a tap
   */
  private maxDistance;
  /**
   * Number of consecutive taps to detect
   */
  private taps;
  constructor(options: TapGestureOptions<GestureName>);
  clone(overrides?: Record<string, unknown>): TapGesture<GestureName>;
  destroy(): void;
  protected updateOptions(options: typeof this.mutableOptionsType): void;
  protected resetState(): void;
  /**
   * Handle pointer events for the tap gesture
   */
  protected handlePointerEvent(pointers: Map<number, PointerData>, event: PointerEvent): void;
  /**
   * Fire the main tap event when a valid tap is detected
   */
  private fireTapEvent;
  /**
   * Cancel the current tap gesture
   */
  private cancelTap;
}