import type { ComputedXAxis, ComputedYAxis } from "../../../../models/axis.js";
import type { DefaultizedSeriesType } from "../../../../models/seriesType/index.js";
import type { ZAxisDefaultized } from "../../../../models/z-axis.js";
import type { ChartSeriesType } from "../../../../models/seriesType/config.js";
/**
 * Map data index to a color.
 * If dataIndex is not defined, it falls back to the series color when defined.
 */
export type ColorGetter<TSeriesType extends ChartSeriesType> = TSeriesType extends 'pie' | 'funnel' | 'heatmap' ? (dataIndex: number) => string : (dataIndex?: number) => string;
/**
 * Transforms charts config to a color getter.
 * If dataIndex is not defined, it falls back to the series color.
 * @param {DefaultizedSeriesType<TSeriesType>} series - The series configuration.
 * @param {ComputedXAxis | undefined} xAxis - The computed x-axis configuration.
 * @param {ComputedYAxis | undefined} yAxis - The computed y-axis configuration.
 * @param {ZAxisDefaultized | undefined} zAxis - The defaulted z-axis configuration.
 * @returns {ColorGetter<TSeriesType>} A function that takes a data index and returns a color string.
 */
export type ColorProcessor<TSeriesType extends ChartSeriesType> = (series: DefaultizedSeriesType<TSeriesType>, xAxis?: ComputedXAxis, yAxis?: ComputedYAxis, zAxis?: ZAxisDefaultized) => ColorGetter<TSeriesType>;