import { Gesture } from "./Gesture.js";
import { PointerManagerOptions } from "./PointerManager.js";
import { GestureElement } from "./types/GestureElement.js";
import { MergeUnions } from "./types/MergeUnions.js";
import { OmitNever } from "./types/OmitNever.js";
import { Simplify } from "./types/Simplify.js";
import { TargetElement } from "./types/TargetElement.js";
/**
 * Configuration options for initializing the GestureManager
 */
export type GestureManagerOptions<GestureName extends string, Gestures extends Gesture<GestureName>> = PointerManagerOptions & {
  /**
   * Array of gesture templates to register with the manager.
   * These serve as prototypes that can be cloned for individual elements.
   */
  gestures: Gestures[];
};
/**
 * The primary class responsible for setting up and managing gestures across multiple elements.
 *
 * GestureManager maintains a collection of gesture templates that can be instantiated for
 * specific DOM elements. It handles lifecycle management, event dispatching, and cleanup.
 *
 * @example
 * ```typescript
 * // Basic setup with default gestures
 * const manager = new GestureManager({
 *   root: document.body,
 *   touchAction: 'none',
 *   gestures: [
 *     new PanGesture({ name: 'pan' }),
 *   ],
 * });
 *
 * // Register pan gestures on an element
 * const element = manager.registerElement('pan', document.querySelector('.draggable'));
 *
 * // Add event listeners with proper typing
 * element.addEventListener('panStart', (event) => {
 *   console.log('Pan started');
 * });
 *
 * element.addEventListener('pan', (event) => {
 *   console.log(`Pan delta: ${event.deltaX}, ${event.deltaY}`);
 * });
 *
 * // Custom gesture types
 * interface MyGestureEvents {
 *   custom: { x: number, y: number }
 * }
 * const customManager = new GestureManager<MyGestureEvents>({
 *   root: document.body
 *   gestures: [
 *     new CustomGesture({ name: 'custom' }),
 *   ],
 * });
 * ```
 */
export declare class GestureManager<GestureName extends string, Gestures extends Gesture<GestureName>, GestureUnion extends Gesture<GestureName> = Gestures[][number], GestureNameUnion extends string = (GestureUnion extends Gesture<infer N> ? N : never), GestureNameUnionComplete extends string = (GestureUnion extends Gesture<string> ? GestureUnion['isSinglePhase'] extends true ? GestureUnion extends Gesture<infer N> ? N : never : GestureUnion['isSinglePhase'] extends false ? GestureUnion extends Gesture<infer N> ? `${N}Start` | N | `${N}End` | `${N}Cancel` : never : never : never), GestureNameToGestureMap extends Record<string, GestureUnion> = MergeUnions<{ [K in GestureNameUnion]: GestureUnion extends Gesture<string> ? GestureUnion['isSinglePhase'] extends true ? GestureUnion extends Gesture<K> ? GestureUnion : never : never : never } | { [K in GestureNameUnionComplete]: GestureUnion extends Gesture<string> ? GestureUnion['isSinglePhase'] extends false ? K extends `${infer N}${'Start' | 'End' | 'Cancel'}` ? GestureUnion extends Gesture<N> ? GestureUnion : never : GestureUnion extends Gesture<K> ? GestureUnion : never : never : never }>, GestureNameToEventMap = Simplify<{ [K in keyof GestureNameToGestureMap]: Simplify<Omit<GestureNameToGestureMap[K]['eventType'], 'detail'> & {
  detail: Simplify<Omit<GestureNameToGestureMap[K]['eventType']['detail'], 'activeGestures'> & {
    activeGestures: Record<GestureNameUnion, boolean>;
  }>;
}> }>, GestureNameToOptionsMap = { [K in keyof GestureNameToGestureMap]: GestureNameToGestureMap[K]['mutableOptionsType'] }, GestureNameToStateMap = Simplify<OmitNever<{ [K in keyof GestureNameToGestureMap]: GestureNameToGestureMap[K]['mutableStateType'] }>>> {
  /** Repository of gesture templates that can be cloned for specific elements */
  private gestureTemplates;
  /** Maps DOM elements to their active gesture instances */
  private elementGestureMap;
  private activeGesturesRegistry;
  private pointerManager;
  private keyboardManager;
  /**
   * Create a new GestureManager instance to coordinate gesture recognition
   *
   * @param options - Configuration options for the gesture manager
   */
  constructor(options: GestureManagerOptions<GestureName, Gestures>);
  /**
   * Add a gesture template to the manager's template registry.
   * Templates serve as prototypes that can be cloned for individual elements.
   *
   * @param gesture - The gesture instance to use as a template
   */
  private addGestureTemplate;
  /**
   * Updates the options for a specific gesture on a given element and emits a change event.
   *
   * @param gestureName - Name of the gesture whose options should be updated
   * @param element - The DOM element where the gesture is attached
   * @param options - New options to apply to the gesture
   * @returns True if the options were successfully updated, false if the gesture wasn't found
   *
   * @example
   * ```typescript
   * // Update pan gesture sensitivity on the fly
   * manager.setGestureOptions('pan', element, { threshold: 5 });
   * ```
   */
  setGestureOptions<T extends TargetElement, GNU extends GestureNameUnion, GN extends keyof GestureNameToOptionsMap & string = (GNU extends keyof GestureNameToOptionsMap ? GNU : never)>(gestureName: GN, element: T, options: GestureNameToOptionsMap[GN]): void;
  /**
   * Updates the state for a specific gesture on a given element and emits a change event.
   *
   * @param gestureName - Name of the gesture whose state should be updated
   * @param element - The DOM element where the gesture is attached
   * @param state - New state to apply to the gesture
   * @returns True if the state was successfully updated, false if the gesture wasn't found
   *
   * @example
   * ```typescript
   * // Update total delta for a turnWheel gesture
   * manager.setGestureState('turnWheel', element, { totalDeltaX: 10 });
   * ```
   */
  setGestureState<T extends TargetElement, GNU extends GestureNameUnion, GN extends keyof GestureNameToStateMap & string = (GNU extends keyof GestureNameToStateMap ? GNU : never)>(gestureName: GN, element: T, state: GestureNameToStateMap[GN]): void;
  /**
   * Register an element to recognize one or more gestures.
   *
   * This method clones the specified gesture template(s) and creates
   * gesture recognizer instance(s) specifically for the provided element.
   * The element is returned with enhanced TypeScript typing for gesture events.
   *
   * @param gestureNames - Name(s) of the gesture(s) to register (must match template names)
   * @param element - The DOM element to attach the gesture(s) to
   * @param options - Optional map of gesture-specific options to override when registering
   * @returns The same element with properly typed event listeners
   *
   * @example
   * ```typescript
   * // Register multiple gestures
   * const element = manager.registerElement(['pan', 'pinch'], myDiv);
   *
   * // Register a single gesture
   * const draggable = manager.registerElement('pan', dragHandle);
   *
   * // Register with customized options for each gesture
   * const customElement = manager.registerElement(
   *   ['pan', 'pinch', 'rotate'],
   *   myElement,
   *   {
   *     pan: { threshold: 20, direction: ['left', 'right'] },
   *     pinch: { threshold: 0.1 }
   *   }
   * );
   * ```
   */
  registerElement<T extends TargetElement, GNU extends GestureNameUnion, GN extends keyof GestureNameToOptionsMap & string = (GNU extends keyof GestureNameToOptionsMap ? GNU : never)>(gestureNames: GN | GN[], element: T, options?: Partial<Pick<GestureNameToOptionsMap, GN>>): GestureElement<GestureNameUnionComplete, GestureNameToEventMap, T>;
  /**
   * Internal method to register a single gesture on an element.
   *
   * @param gestureName - Name of the gesture to register
   * @param element - DOM element to attach the gesture to
   * @param options - Optional options to override the gesture template configuration
   * @returns True if the registration was successful, false otherwise
   */
  private registerSingleGesture;
  /**
   * Unregister a specific gesture from an element.
   * This removes the gesture recognizer and stops event emission for that gesture.
   *
   * @param gestureName - Name of the gesture to unregister
   * @param element - The DOM element to remove the gesture from
   * @returns True if the gesture was found and removed, false otherwise
   */
  unregisterElement(gestureName: string, element: TargetElement): boolean;
  /**
   * Unregister all gestures from an element.
   * Completely removes the element from the gesture system.
   *
   * @param element - The DOM element to remove all gestures from
   */
  unregisterAllGestures(element: TargetElement): void;
  /**
   * Clean up all gestures and event listeners.
   * Call this method when the GestureManager is no longer needed to prevent memory leaks.
   */
  destroy(): void;
}