/**
 * PanGesture - Detects panning (dragging) movements
 *
 * This gesture tracks pointer dragging movements across elements, firing events when:
 * - The drag movement begins and passes the threshold distance (start)
 * - The drag movement continues (ongoing)
 * - The drag movement ends (end)
 *
 * The gesture can be configured to recognize movement only in specific directions.
 */
import { GestureState } from "../Gesture.js";
import { PointerGesture, PointerGestureEventData, PointerGestureOptions } from "../PointerGesture.js";
import { PointerData } from "../PointerManager.js";
/**
 * The direction of movement for the pan gesture
 * This type defines the detected directions based on the vertical and horizontal components
 * The values can be 'up', 'down', 'left', 'right' or null if not applicable.
 *
 * The null values indicate that the gesture is not moving in that direction.
 */
export type Direction = {
  vertical: 'up' | 'down' | null;
  horizontal: 'left' | 'right' | null;
  mainAxis: 'horizontal' | 'vertical' | 'diagonal' | null;
};
/**
 * Configuration options for PanGesture
 * Extends PointerGestureOptions with direction constraints
 */
export type PanGestureOptions<GestureName extends string> = PointerGestureOptions<GestureName> & {
  /**
   * Optional array of allowed directions for the pan gesture
   * If not specified, all directions are allowed
   */
  direction?: Array<'up' | 'down' | 'left' | 'right'>;
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
 * Event data specific to pan gesture events
 * Contains information about movement distance, direction, and velocity
 */
export type PanGestureEventData<CustomData extends Record<string, unknown> = Record<string, unknown>> = PointerGestureEventData<CustomData> & {
  /** The centroid position at the start of the gesture */
  initialCentroid: {
    x: number;
    y: number;
  };
  /** Horizontal distance moved in pixels from last event */
  deltaX: number;
  /** Vertical distance moved in pixels from last event */
  deltaY: number;
  /** Total accumulated horizontal movement in pixels */
  totalDeltaX: number;
  /** Total accumulated vertical movement in pixels */
  totalDeltaY: number;
  /** Horizontal distance moved in pixels from the start of the current gesture */
  activeDeltaX: number;
  /** Vertical distance moved in pixels from the start of the current gesture */
  activeDeltaY: number;
  /** The direction of movement with vertical and horizontal components */
  direction: Direction;
  /** Horizontal velocity in pixels per second */
  velocityX: number;
  /** Vertical velocity in pixels per second */
  velocityY: number;
  /** Total velocity magnitude in pixels per second */
  velocity: number;
};
/**
 * Type definition for the CustomEvent created by PanGesture
 */
export type PanEvent<CustomData extends Record<string, unknown> = Record<string, unknown>> = CustomEvent<PanGestureEventData<CustomData>>;
/**
 * State tracking for the PanGesture
 */
export type PanGestureState = GestureState & {
  /** The initial centroid position when the gesture began */
  startCentroid: {
    x: number;
    y: number;
  } | null;
  /** The most recent centroid position during the gesture */
  lastCentroid: {
    x: number;
    y: number;
  } | null;
  /** Whether the movement threshold has been reached to activate the gesture */
  movementThresholdReached: boolean;
  /** Total accumulated horizontal delta since gesture tracking began */
  totalDeltaX: number;
  /** Total accumulated vertical delta since gesture tracking began */
  totalDeltaY: number;
  /** Active horizontal delta since the start of the current gesture */
  activeDeltaX: number;
  /** Active vertical delta since the start of the current gesture */
  activeDeltaY: number;
  /** Map of pointers that initiated the gesture, used for tracking state */
  startPointers: Map<number, PointerData>;
  /** The last direction of movement detected */
  lastDirection: Direction;
  /** The last delta movement in pixels since the last event */
  lastDeltas: {
    x: number;
    y: number;
  } | null;
};
/**
 * PanGesture class for handling panning/dragging interactions
 *
 * This gesture detects when users drag across elements with one or more pointers,
 * and dispatches directional movement events with delta and velocity information.
 */
export declare class PanGesture<GestureName extends string> extends PointerGesture<GestureName> {
  protected state: PanGestureState;
  protected readonly isSinglePhase: false;
  protected readonly eventType: PanEvent;
  protected readonly optionsType: PanGestureOptions<GestureName>;
  protected readonly mutableOptionsType: Omit<typeof this.optionsType, 'name'>;
  protected readonly mutableStateType: Omit<Partial<typeof this.state>, 'startPointers' | 'startCentroid' | 'lastCentroid' | 'movementThresholdReached' | 'lastDirection'>;
  /**
   * Movement threshold in pixels that must be exceeded before the gesture activates.
   * Higher values reduce false positive gesture detection for small movements.
   */
  protected threshold: number;
  /**
   * Allowed directions for the pan gesture
   * Default allows all directions
   */
  private direction;
  constructor(options: PanGestureOptions<GestureName>);
  clone(overrides?: Record<string, unknown>): PanGesture<GestureName>;
  destroy(): void;
  protected updateOptions(options: typeof this.mutableOptionsType): void;
  protected resetState(): void;
  /**
   * Handle pointer events for the pan gesture
   */
  protected handlePointerEvent(pointers: Map<number, PointerData>, event: PointerEvent): void;
  /**
   * Emit pan-specific events with additional data
   */
  private emitPanEvent;
  /**
   * Cancel the current gesture
   */
  private cancel;
}