import type { ChartStore } from "./ChartStore.js";
import { ChartAnyPluginSignature, ChartState } from "../models/index.js";
export declare function useLazySelectorEffect<TSignatures extends readonly ChartAnyPluginSignature[], Value>(store: ChartStore<TSignatures>, selector: (state: ChartState<TSignatures>) => Value, effect: (previous: Value, next: Value) => void,
/**
 * If true, the selector will be ignored.
 */
skip?: boolean): void;