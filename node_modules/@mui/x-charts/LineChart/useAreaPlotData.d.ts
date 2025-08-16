import { ComputedAxisConfig } from "../internals/plugins/featurePlugins/useChartCartesianAxis/index.js";
import { ChartsXAxisProps, ChartsYAxisProps } from "../models/index.js";
import { SeriesId } from "../models/seriesType/common.js";
interface AreaPlotDataPoint {
  d: string;
  seriesId: SeriesId;
  color: string;
  area?: boolean;
  gradientId?: string;
}
export declare function useAreaPlotData(xAxes: ComputedAxisConfig<ChartsXAxisProps>, yAxes: ComputedAxisConfig<ChartsYAxisProps>): AreaPlotDataPoint[];
export {};