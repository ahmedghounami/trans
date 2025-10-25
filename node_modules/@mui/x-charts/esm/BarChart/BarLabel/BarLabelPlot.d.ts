import * as React from 'react';
import type { ProcessedBarSeriesData } from "../types.js";
import { BarLabelItemProps } from "./BarLabelItem.js";
type BarLabelPlotProps = {
  bars: ProcessedBarSeriesData[];
  skipAnimation?: boolean;
  barLabel?: BarLabelItemProps['barLabel'];
};
/**
 * @ignore - internal component.
 */
declare function BarLabelPlot(props: BarLabelPlotProps): React.JSX.Element;
export { BarLabelPlot };