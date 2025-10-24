import { AxisId } from "../../../../models/axis.js";
import { DefaultizedZoomOptions } from "./useChartCartesianAxis.types.js";
import { ZoomOptions } from "./zoom.types.js";
export declare const defaultZoomOptions: {
  minStart: number;
  maxEnd: number;
  step: number;
  minSpan: number;
  maxSpan: number;
  panning: true;
  filterMode: "keep";
  slider: {
    enabled: false;
    preview: false;
    size: number;
    showTooltip: import("./zoom.types.js").ZoomSliderShowTooltip;
  };
};
export declare const defaultizeZoom: (zoom: boolean | ZoomOptions | undefined, axisId: AxisId, axisDirection: "x" | "y") => DefaultizedZoomOptions | undefined;