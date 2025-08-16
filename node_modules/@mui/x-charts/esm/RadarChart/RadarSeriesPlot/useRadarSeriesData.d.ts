import { SeriesId } from "../../models/seriesType/common.js";
/**
 * This hook provides all the data needed to display radar series.
 * @param querySeriesId The id of the series to display
 * @returns
 */
export declare function useRadarSeriesData(querySeriesId?: SeriesId): {
  seriesId: SeriesId;
  isSeriesHighlighted: boolean;
  isSeriesFaded: boolean;
  points: {
    x: number;
    y: number;
    isItemHighlighted: boolean;
    isItemFaded: boolean;
    dataIndex: number;
  }[];
  type: "radar";
  label?: string | ((location: "tooltip" | "legend") => string) | undefined;
  highlightScope?: import("../../index.js").HighlightScope | undefined;
  labelMarkType?: import("../../internals/index.js").ChartsLabelMarkType | undefined;
  hideMark?: boolean | undefined;
  fillArea?: boolean | undefined;
  data: number[];
  color: string;
  id: SeriesId;
  valueFormatter: import("../../internals/index.js").SeriesValueFormatter<number>;
}[];