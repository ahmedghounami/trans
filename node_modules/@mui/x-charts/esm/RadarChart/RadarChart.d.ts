import * as React from 'react';
import { ChartsLegendSlotProps, ChartsLegendSlots } from "../ChartsLegend/index.js";
import { ChartsOverlayProps, ChartsOverlaySlotProps, ChartsOverlaySlots } from "../ChartsOverlay/ChartsOverlay.js";
import { ChartsSurfaceProps } from "../ChartsSurface/index.js";
import { ChartsWrapperProps } from "../ChartsWrapper/index.js";
import { RadarGridProps } from "./RadarGrid/index.js";
import { RadarDataProviderProps } from "./RadarDataProvider/RadarDataProvider.js";
import { RadarSeriesPlotProps } from "./RadarSeriesPlot/index.js";
import { RadarAxisHighlightProps } from "./RadarAxisHighlight/index.js";
import { ChartsTooltipSlotProps, ChartsTooltipSlots } from "../ChartsTooltip/index.js";
import { ChartsSlotProps, ChartsSlots } from "../internals/material/index.js";
import { ChartsToolbarSlotProps, ChartsToolbarSlots } from "../Toolbar/index.js";
export interface RadarChartSlots extends ChartsTooltipSlots, ChartsOverlaySlots, ChartsLegendSlots, ChartsToolbarSlots, Partial<ChartsSlots> {}
export interface RadarChartSlotProps extends ChartsTooltipSlotProps, ChartsOverlaySlotProps, ChartsLegendSlotProps, ChartsToolbarSlotProps, Partial<ChartsSlotProps> {}
export interface RadarChartProps extends RadarDataProviderProps, Omit<RadarGridProps, 'classes'>, Omit<Partial<RadarAxisHighlightProps>, 'classes'>, Omit<ChartsOverlayProps, 'slots' | 'slotProps'>, Pick<ChartsWrapperProps, 'sx'>, Omit<ChartsSurfaceProps, 'sx'>, Pick<RadarSeriesPlotProps, 'onAreaClick' | 'onMarkClick'> {
  /**
   * If `true`, the legend is not rendered.
   */
  hideLegend?: boolean;
  /**
   * If true, shows the default chart toolbar.
   * @default false
   */
  showToolbar?: boolean;
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: RadarChartSlots;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: RadarChartSlotProps;
}
/**
 * Demos:
 *
 * - [Radar Chart](https://mui.com/x/react-charts/radar/)
 *
 * API:
 *
 * - [RadarChart API](https://mui.com/x/api/charts/radar-chart/)
 */
declare const RadarChart: React.ForwardRefExoticComponent<RadarChartProps & React.RefAttributes<SVGSVGElement>>;
export { RadarChart };