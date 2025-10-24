import { SeriesId } from "../models/seriesType/common.js";
import { D3Scale } from "../models/axis.js";
import { DefaultizedScatterSeriesType, ScatterValueType } from "../models/index.js";
export declare function useScatterPlotData(series: DefaultizedScatterSeriesType, xScale: D3Scale, yScale: D3Scale, isPointInside: (x: number, y: number) => boolean): (ScatterValueType & {
  dataIndex: number;
  seriesId: SeriesId;
  type: "scatter";
})[];