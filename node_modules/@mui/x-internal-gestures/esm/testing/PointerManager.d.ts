import { Pointer, PointerAmount, Pointers, PointerType } from "./types/Pointers.js";
export type PointerState = {
  id: number;
  x: number;
  y: number;
  isDown?: boolean;
  target: Element;
};
export type PointerTargetChange = {
  pointer: PointerState;
  oldTarget?: Element;
};
export declare class PointerManager {
  protected pointers: Map<number, PointerState>;
  protected count: number;
  readonly mode: PointerType;
  constructor(mode: PointerType);
  protected clearPointers(): void;
  protected addPointers(pointer: PointerState | PointerState[]): void;
  protected removePointers(id: number | number[]): void;
  protected updatePointers(pointer: PointerState): PointerTargetChange;
  protected updatePointers(pointer: PointerState[]): PointerTargetChange[];
  nextId(): number;
  parseMousePointer(pointer: Pointer | undefined, target: Element): Required<Pointer>;
  parsePointers(pointers: Pointers | undefined, target: Element, defaultConfig: Required<Omit<PointerAmount, 'ids'>>): Required<Pointer>[];
  protected pointerEnter(pointer: Required<Pointer>): void;
  protected pointerLeave(pointer: Required<Pointer>, oldTarget: Element): void;
  pointerDown(pointer: Required<Pointer>): void;
  pointerMove(pointer: Required<Pointer>): void;
  pointerUp(pointer: Required<Pointer>): void;
}