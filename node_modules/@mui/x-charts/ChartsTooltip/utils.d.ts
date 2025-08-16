type MousePosition = {
  x: number;
  y: number;
  pointerType: 'mouse' | 'touch' | 'pen';
  height: number;
};
export type UseMouseTrackerReturnValue = null | MousePosition;
/**
 * @deprecated We recommend using vanilla JS to let popper track mouse position.
 */
export declare function useMouseTracker(): UseMouseTrackerReturnValue;
type PointerType = Pick<MousePosition, 'pointerType'>;
export declare function usePointerType(): null | PointerType;
export type TriggerOptions = 'item' | 'axis' | 'none';
export declare function utcFormatter(v: string | number | Date): string;
/**
 * Returns true if the main pointer is fine (e.g. mouse).
 * This is useful for determining how to position tooltips or other UI elements based on the type of input device.
 * @returns true if the main pointer is fine, false otherwise.
 */
export declare const useIsFineMainPointer: () => boolean;
export {};