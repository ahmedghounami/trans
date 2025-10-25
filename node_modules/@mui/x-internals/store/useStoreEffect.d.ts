import type { Store } from "./Store.js";
/**
 * An Effect implementation for the Store. This should be used for side-effects only. To
 * compute and store derived state, use `createSelectorMemoized` instead.
 */
export declare function useStoreEffect<State, Value>(store: Store<State>, selector: (state: State) => Value, effect: (previous: Value, next: Value) => void): void;