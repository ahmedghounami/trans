import { AxisId, AxisItemIdentifier, ChartsAxisProps } from "../../../../models/axis.js";
import { ComputeResult } from "./computeAxisValue.js";
export declare const selectChartsInteractionAxisIndex: (value: number | null, axes: ComputeResult<ChartsAxisProps>, id?: AxisId) => number | null;
export declare const selectorChartsInteractionXAxisIndex: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, number | null, [id?: AxisId | undefined]>;
export declare const selectorChartsInteractionYAxisIndex: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, number | null, [id?: AxisId | undefined]>;
export declare const selectorChartAxisInteraction: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, {
  axisId: AxisId;
  dataIndex: number;
}[], any[]>;
/**
 * Get interaction values
 */
type Value = number | Date | null;
export declare const selectorChartsInteractionXAxisValue: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, Value, [id?: AxisId | undefined]>;
export declare const selectorChartsInteractionYAxisValue: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, Value, [id?: AxisId | undefined]>;
/**
 * Get x-axis ids and corresponding data index that should be display in the tooltip.
 */
export declare const selectorChartsInteractionTooltipXAxes: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, AxisItemIdentifier[], any[]>;
/**
 * Get y-axis ids and corresponding data index that should be display in the tooltip.
 */
export declare const selectorChartsInteractionTooltipYAxes: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, AxisItemIdentifier[], any[]>;
/**
 * Return `true` if the axis tooltip has something to display.
 */
export declare const selectorChartsInteractionAxisTooltip: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, boolean, any[]>;
export {};