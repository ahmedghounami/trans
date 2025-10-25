/**
 * PinchGesture - Detects pinch (zoom) movements with two or more pointers
 *
 * This gesture tracks when multiple pointers move toward or away from each other, firing events when:
 * - Two or more pointers begin moving (start)
 * - The pointers continue changing distance (ongoing)
 * - One or more pointers are released or lifted (end)
 *
 * This gesture is commonly used to implement zoom functionality in touch interfaces.
 */
import { GestureState } from "../Gesture.js";
import { PointerGesture, PointerGestureEventData, PointerGestureOptions } from "../PointerGesture.js";
import { PointerData } from "../PointerManager.js";
/**
 * Configuration options for the PinchGesture
 * Uses the same options as the base PointerGesture
 */
export type PinchGestureOptions<GestureName extends string> = PointerGestureOptions<GestureName> & {
  /**
   * Minimum number of pointers required to activate the gesture.
   * The gesture will not start until at least this many pointers are active.
   *
   * @default 2
   */
  minPointers?: number;
  /**
   * Distance threshold in pixels for gesture activation.
   *
   * The gesture will only be recognized once the pointers have moved this many
   * pixels from their starting positions. Higher values prevent accidental
   * gesture recognition when the user makes small unintentional movements.
   *
   * @default 0 (no threshold)
   */
  threshold?: number;
};
/**
 * Event data specific to pinch gesture events
 * Contains information about scale, distance, and velocity
 */
export type PinchGestureEventData<CustomData extends Record<string, unknown> = Record<string, unknown>> = PointerGestureEventData<CustomData> & {
  /** Relative scale factor comparing current distance to initial distance (1.0 = no change) */
  scale: number;
  /** Change in scale since the last event */
  deltaScale: number;
  /** Total accumulated scale factor across all pinch operations */
  totalScale: number;
  /** Current distance between pointers in pixels */
  distance: number;
  /** Speed of the pinch movement in pixels per second */
  velocity: number;
  /** Direction of the pinch: 1 for spreading/zooming in, -1 for pinching/zooming out, 0 for no change */
  direction: -1 | 0 | 1;
};
/**
 * Type definition for the CustomEvent created by PinchGesture
 */
export type PinchEvent<CustomData extends Record<string, unknown> = Record<string, unknown>> = CustomEvent<PinchGestureEventData<CustomData>>;
/**
 * State tracking for the PinchGesture
 */
export type PinchGestureState = GestureState & {
  /** The initial distance between pointers when the gesture began */
  startDistance: number;
  /** The most recent distance between pointers during the gesture */
  lastDistance: number;
  /** The most recent scale value (ratio of current to initial distance) */
  lastScale: number;
  /** Timestamp of the last pinch event, used for velocity calculation */
  lastTime: number;
  /** Current velocity of the pinch movement in pixels per second */
  velocity: number;
  /** Total accumulated scale factor across all pinch operations */
  totalScale: number;
  /** Change in scale since the last event */
  deltaScale: number;
};
/**
 * PinchGesture class for handling pinch/zoom interactions
 *
 * This gesture detects when users move multiple pointers toward or away from each other,
 * and dispatches scale-related events with distance and velocity information.
 */
export declare class PinchGesture<GestureName extends string> extends PointerGesture<GestureName> {
  protected state: PinchGestureState;
  protected readonly isSinglePhase: false;
  protected readonly eventType: PinchEvent;
  protected readonly optionsType: PinchGestureOptions<GestureName>;
  protected readonly mutableOptionsType: Omit<typeof this.optionsType, 'name'>;
  protected readonly mutableStateType: Omit<Partial<typeof this.state>, 'startDistance' | 'lastDistance' | 'lastScale' | 'lastTime' | 'velocity'>;
  /**
   * Movement threshold in pixels that must be exceeded before the gesture activates.
   * Higher values reduce false positive gesture detection for small movements.
   */
  protected threshold: number;
  constructor(options: PinchGestureOptions<GestureName>);
  clone(overrides?: Record<string, unknown>): PinchGesture<GestureName>;
  destroy(): void;
  protected updateOptions(options: typeof this.mutableOptionsType): void;
  protected resetState(): void;
  /**
   * Handle pointer events for the pinch gesture
   */
  protected handlePointerEvent(pointers: Map<number, PointerData>, event: PointerEvent): void;
  /**
   * Emit pinch-specific events with additional data
   */
  private emitPinchEvent;
}