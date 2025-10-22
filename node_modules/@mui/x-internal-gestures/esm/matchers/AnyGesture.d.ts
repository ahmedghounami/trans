import { Gesture } from "../core/index.js";
export type AnyGesture = new <T extends {
  name: N;
}, N extends string = string>(options: T, ...args: any[]) => Gesture<N>;