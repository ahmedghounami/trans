import { SelectorArray, Combiner, Selector, GetStateFromSelectors, GetParamsFromSelectors, CreateSelectorOptions } from 'reselect';
import { ChartAnyPluginSignature, ChartState, ChartStateCacheKey } from "../models/index.js";
export type ChartRootSelector<TSignature extends ChartAnyPluginSignature> = Selector<ChartState<[TSignature]>, TSignature['state'][keyof TSignature['state']]>;
export type ChartOptionalRootSelector<TSignature extends ChartAnyPluginSignature> = Selector<ChartState<[], [TSignature]>, TSignature['state'][keyof TSignature['state']] | undefined>;
export type ChartsSelector<Signatures extends readonly ChartAnyPluginSignature[] = [], OptionalSignatures extends readonly ChartAnyPluginSignature[] = [], Result = unknown, Args extends readonly any[] = []> = Selector<ChartState<Signatures, OptionalSignatures>, Result, Args>;
type InterruptRecursion = NonNullable<unknown>;
type AnyFunction = (...args: any[]) => any;
export type Simplify<T> = T extends AnyFunction ? T : { [KeyType in keyof T]: T[KeyType] } & NonNullable<unknown>;
/**
 * Method wrapping reselect's createSelector to provide caching for chart instances.
 *
 */
export declare const createSelector: <InputSelectors extends SelectorArray<any>, Result>(...createSelectorArgs: [inputSelectors: [...InputSelectors], combiner: Combiner<InputSelectors, Result>, createSelectorOptions?: Simplify<CreateSelectorOptions<any,
// MemoizeFunction,
any,
// ArgsMemoizeFunction,
any,
// OverrideMemoizeFunction,
any>>]) => Selector<GetStateFromSelectors<InputSelectors> & {
  cacheKey: ChartStateCacheKey;
}, Result, GetParamsFromSelectors<InputSelectors> & InterruptRecursion>;
export {};