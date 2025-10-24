import { ComputedAxisConfig } from "../internals/plugins/featurePlugins/useChartCartesianAxis/index.js";
import { ChartsXAxisProps, ChartsYAxisProps } from "../models/index.js";
import { SeriesId } from "../models/seriesType/common.js";
interface LinePlotDataPoint {
  d: string;
  seriesId: SeriesId;
  color: string;
  gradientId?: string;
}
export declare function useLinePlotData(xAxes: ComputedAxisConfig<ChartsXAxisProps>, yAxes: ComputedAxisConfig<ChartsYAxisProps>): LinePlotDataPoint[];
export {};