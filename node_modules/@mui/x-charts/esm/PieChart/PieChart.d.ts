import * as React from 'react';
import { MakeOptional } from '@mui/x-internals/types';
import { ChartsToolbarSlotProps, ChartsToolbarSlots } from "../Toolbar/index.js";
import { ChartsSlotProps, ChartsSlots } from "../internals/material/index.js";
import { ChartContainerProps } from "../ChartContainer/index.js";
import { PieSeriesType } from "../models/seriesType/index.js";
import { ChartsTooltipSlots, ChartsTooltipSlotProps } from "../ChartsTooltip/ChartTooltip.types.js";
import { ChartsLegendSlotProps, ChartsLegendSlots } from "../ChartsLegend/index.js";
import { PiePlotProps, PiePlotSlotProps, PiePlotSlots } from "./PiePlot.js";
import { PieValueType } from "../models/seriesType/pie.js";
import { ChartsOverlayProps, ChartsOverlaySlotProps, ChartsOverlaySlots } from "../ChartsOverlay/index.js";
import { PieChartPluginSignatures } from "./PieChart.plugins.js";
export interface PieChartSlots extends PiePlotSlots, ChartsLegendSlots, ChartsOverlaySlots, ChartsTooltipSlots, ChartsToolbarSlots, Partial<ChartsSlots> {}
export interface PieChartSlotProps extends PiePlotSlotProps, ChartsLegendSlotProps, ChartsOverlaySlotProps, ChartsTooltipSlotProps, ChartsToolbarSlotProps, Partial<ChartsSlotProps> {}
export type PieSeries = MakeOptional<PieSeriesType<MakeOptional<PieValueType, 'id'>>, 'type'>;
export interface PieChartProps extends Omit<ChartContainerProps<'pie', PieChartPluginSignatures>, 'series' | 'slots' | 'slotProps' | 'experimentalFeatures'>, Omit<ChartsOverlayProps, 'slots' | 'slotProps'>, Pick<PiePlotProps, 'skipAnimation'> {
  /**
   * The series to display in the pie chart.
   * An array of [[PieSeries]] objects.
   */
  series: Readonly<PieSeries[]>;
  /**
   * If `true`, the legend is not rendered.
   */
  hideLegend?: boolean;
  /**
   * Callback fired when a pie arc is clicked.
   */
  onItemClick?: PiePlotProps['onItemClick'];
  /**
   * If true, shows the default chart toolbar.
   * @default false
   */
  showToolbar?: boolean;
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: PieChartSlots;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: PieChartSlotProps;
}
/**
 * Demos:
 *
 * - [Pie](https://mui.com/x/react-charts/pie/)
 * - [Pie demonstration](https://mui.com/x/react-charts/pie-demo/)
 *
 * API:
 *
 * - [PieChart API](https://mui.com/x/api/charts/pie-chart/)
 */
declare const PieChart: React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<SVGSVGElement>>;
export { PieChart };