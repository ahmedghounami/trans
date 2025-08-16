import * as React from 'react';
import { ChartsSlotProps, ChartsSlots } from "../internals/material/index.js";
type SlotProps<T extends Record<keyof T, React.ComponentType<any>>> = { [key in keyof T]: React.ComponentProps<T[key]> };
export interface ChartsSlotsContextValue<T extends ChartsSlots & Record<keyof T, React.ComponentType<any>> = ChartsSlots> {
  slots: T;
  slotProps: Partial<SlotProps<T>>;
}
export declare const ChartsSlotsContext: React.Context<ChartsSlotsContextValue<ChartsSlots> | null>;
/**
 * Get the slots and slotProps from the nearest `ChartDataProvider` or `ChartDataProviderPro`.
 * @returns {ChartsSlotsContextValue} The slots and slotProps from the context.
 */
export declare function useChartsSlots<T extends ChartsSlots & Record<keyof T, React.ComponentType<any>> = ChartsSlots>(): ChartsSlotsContextValue<T>;
interface ChartsSlotsProviderProps {
  slots?: Partial<ChartsSlots>;
  slotProps?: Partial<ChartsSlotProps>;
  defaultSlots: ChartsSlots;
}
export declare function ChartsSlotsProvider(props: React.PropsWithChildren<ChartsSlotsProviderProps>): React.JSX.Element;
export {};