import type { ZoomSliderShowTooltip } from "./plugins/featurePlugins/useChartCartesianAxis/zoom.types.js";
/** Margin in the opposite direction of the axis, i.e., horizontal if the axis is vertical and vice versa. */
export declare const ZOOM_SLIDER_MARGIN = 4;
/** Size of the zoom slider preview. */
export declare const ZOOM_SLIDER_PREVIEW_SIZE = 40;
/** Size reserved for the zoom slider. The actual size of the slider might be smaller. */
export declare const DEFAULT_ZOOM_SLIDER_SIZE: number;
export declare const DEFAULT_ZOOM_SLIDER_PREVIEW_SIZE: number;
export declare const DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP: ZoomSliderShowTooltip;
/** Default margin for pie charts. */
export declare const DEFAULT_PIE_CHART_MARGIN: {
  top: number;
  bottom: number;
  left: number;
  right: number;
};