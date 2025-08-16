/**
 * RotateGesture - Detects rotation movements between two or more pointers
 *
 * This gesture tracks when multiple pointers rotate around a common center point, firing events when:
 * - Two or more pointers begin a rotation motion (start)
 * - The pointers continue rotating (ongoing)
 * - One or more pointers are released or lifted (end)
 *
 * This gesture is commonly used for rotation controls in drawing or image manipulation interfaces.
 */
import { GestureState } from "../Gesture.js";
import { PointerGesture, PointerGestureEventData, PointerGestureOptions } from "../PointerGesture.js";
import { PointerData } from "../PointerManager.js";
/**
 * Configuration options for the RotateGesture
 * Uses the same options as the base PointerGesture
 */
export type RotateGestureOptions<GestureName extends string> = PointerGestureOptions<GestureName>;
/**
 * Event data specific to rotate gesture events
 * Contains information about rotation angle, delta, and velocity
 */
export type RotateGestureEventData<CustomData extends Record<string, unknown> = Record<string, unknown>> = PointerGestureEventData<CustomData> & {
  /** Current absolute rotation in degrees (0-359) */
  rotation: number;
  /** Change in rotation since the last event in degrees */
  delta: number;
  /** Total accumulated rotation in degrees across all gesture interactions */
  totalRotation: number;
  /** Angular velocity in degrees per second */
  velocity: number;
};
/**
 * Type definition for the CustomEvent created by RotateGesture
 */
export type RotateEvent<CustomData extends Record<string, unknown> = Record<string, unknown>> = CustomEvent<RotateGestureEventData<CustomData>>;
/**
 * State tracking for the RotateGesture
 */
export type RotateGestureState = GestureState & {
  /** The initial angle between pointers when the gesture began */
  startAngle: number;
  /** The most recent angle between pointers during the gesture */
  lastAngle: number;
  /** Accumulated rotation in degrees (can exceed 360° for multiple rotations) */
  totalRotation: number;
  /** Timestamp of the last rotate event, used for velocity calculation */
  lastTime: number;
  /** Current angular velocity in degrees per second */
  velocity: number;
  /** The most recent change in angle since the last event */
  lastDelta: number;
};
/**
 * RotateGesture class for handling rotation interactions
 *
 * This gesture detects when users rotate multiple pointers around a central point,
 * and dispatches rotation-related events with angle and angular velocity information.
 */
export declare class RotateGesture<GestureName extends string> extends PointerGesture<GestureName> {
  protected state: RotateGestureState;
  protected readonly isSinglePhase: false;
  protected readonly eventType: RotateEvent;
  protected readonly optionsType: RotateGestureOptions<GestureName>;
  protected readonly mutableOptionsType: Omit<typeof this.optionsType, 'name'>;
  protected readonly mutableStateType: Omit<Partial<typeof this.state>, 'startAngle' | 'lastAngle' | 'lastTime' | 'velocity' | 'lastDelta'>;
  constructor(options: RotateGestureOptions<GestureName>);
  clone(overrides?: Record<string, unknown>): RotateGesture<GestureName>;
  destroy(): void;
  protected updateOptions(options: typeof this.mutableOptionsType): void;
  protected resetState(): void;
  /**
   * Handle pointer events for the rotate gesture
   */
  protected handlePointerEvent(pointers: Map<number, PointerData>, event: PointerEvent): void;
  /**
   * Emit rotate-specific events with additional data
   */
  private emitRotateEvent;
}