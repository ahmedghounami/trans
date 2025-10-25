import { UseChartCartesianAxisSignature } from "./useChartCartesianAxis.types.js";
import { DefaultedXAxis, DefaultedYAxis } from "../../../../models/axis.js";
import { ChartState } from "../../models/chart.js";
export declare const selectorChartCartesianAxisState: (state: ChartState<[], [UseChartCartesianAxisSignature]>) => {
  x: DefaultedXAxis[];
  y: DefaultedYAxis[];
} | undefined;
export type SelectorChartRawXAxisType = <State extends ChartState<[], [UseChartCartesianAxisSignature]>>(state: State) => DefaultedXAxis[] | undefined;
export declare const selectorChartRawXAxis: SelectorChartRawXAxisType;
export type SelectorChartRawYAxisType = <State extends ChartState<[], [UseChartCartesianAxisSignature]>>(state: State) => DefaultedYAxis[] | undefined;
export declare const selectorChartRawYAxis: SelectorChartRawYAxisType;