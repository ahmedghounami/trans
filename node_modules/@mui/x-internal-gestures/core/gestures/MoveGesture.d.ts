/**
 * MoveGesture - Detects when a pointer enters, moves within, and leaves an element
 *
 * This gesture tracks pointer movements over an element, firing events when:
 * - A pointer enters the element (start)
 * - A pointer moves within the element (ongoing)
 * - A pointer leaves the element (end)
 *
 * Unlike other gestures which often require specific actions to trigger,
 * the move gesture fires automatically when pointers interact with the target element.
 *
 * This gesture only works with mouse pointers, not touch or pen.
 */
import { ActiveGesturesRegistry } from "../ActiveGesturesRegistry.js";
import { GestureState } from "../Gesture.js";
import type { KeyboardManager } from "../KeyboardManager.js";
import { PointerGesture, PointerGestureEventData, PointerGestureOptions } from "../PointerGesture.js";
import { PointerData, PointerManager } from "../PointerManager.js";
import { TargetElement } from "../types/TargetElement.js";
/**
 * Configuration options for the MoveGesture
 * Extends the base PointerGestureOptions
 */
export type MoveGestureOptions<GestureName extends string> = PointerGestureOptions<GestureName> & {
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
 * Event data specific to move gesture events
 * Includes the source pointer event and standard gesture data
 */
export type MoveGestureEventData<CustomData extends Record<string, unknown> = Record<string, unknown>> = PointerGestureEventData<CustomData> & {};
/**
 * Type definition for the CustomEvent created by MoveGesture
 */
export type MoveEvent<CustomData extends Record<string, unknown> = Record<string, unknown>> = CustomEvent<MoveGestureEventData<CustomData>>;
/**
 * State tracking for the MoveGesture
 */
export type MoveGestureState = GestureState & {
  /** The last recorded pointer position for this element */
  lastPosition: {
    x: number;
    y: number;
  } | null;
};
/**
 * MoveGesture class for handling pointer movement over elements
 *
 * This gesture detects when pointers enter, move within, or leave target elements,
 * and dispatches corresponding custom events.
 *
 * This gesture only works with hovering mouse pointers, not touch.
 */
export declare class MoveGesture<GestureName extends string> extends PointerGesture<GestureName> {
  protected state: MoveGestureState;
  protected readonly isSinglePhase: false;
  protected readonly eventType: MoveEvent;
  protected readonly optionsType: MoveGestureOptions<GestureName>;
  protected readonly mutableOptionsType: Omit<typeof this.optionsType, 'name'>;
  protected readonly mutableStateType: never;
  /**
   * Movement threshold in pixels that must be exceeded before the gesture activates.
   * Higher values reduce false positive gesture detection for small movements.
   */
  protected threshold: number;
  private handleElementEnterBound;
  private handleElementLeaveBound;
  constructor(options: MoveGestureOptions<GestureName>);
  clone(overrides?: Record<string, unknown>): MoveGesture<GestureName>;
  init(element: TargetElement, pointerManager: PointerManager, gestureRegistry: ActiveGesturesRegistry<GestureName>, keyboardManager: KeyboardManager): void;
  destroy(): void;
  protected updateOptions(options: typeof this.mutableOptionsType): void;
  protected resetState(): void;
  /**
   * Handle pointer enter events for a specific element
   * @param event The original pointer event
   */
  private handleElementEnter;
  /**
   * Handle pointer leave events for a specific element
   * @param event The original pointer event
   */
  private handleElementLeave;
  /**
   * Handle pointer events for the move gesture (only handles move events now)
   * @param pointers Map of active pointers
   * @param event The original pointer event
   */
  protected handlePointerEvent(pointers: Map<number, PointerData>, event: PointerEvent): void;
  /**
   * Emit move-specific events
   * @param element The DOM element the event is related to
   * @param phase The current phase of the gesture (start, ongoing, end)
   * @param pointers Array of active pointers
   * @param event The original pointer event
   */
  private emitMoveEvent;
}