import { ChartsXAxisProps, ChartsYAxisProps } from "../models/axis.js";
import { ChartDrawingArea } from "../hooks/index.js";
import { MaskData, ProcessedBarSeriesData } from "./types.js";
import { ComputedAxisConfig } from "../internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxis.types.js";
export declare function useBarPlotData(drawingArea: ChartDrawingArea, xAxes: ComputedAxisConfig<ChartsXAxisProps>, yAxes: ComputedAxisConfig<ChartsYAxisProps>): {
  completedData: ProcessedBarSeriesData[];
  masksData: MaskData[];
};