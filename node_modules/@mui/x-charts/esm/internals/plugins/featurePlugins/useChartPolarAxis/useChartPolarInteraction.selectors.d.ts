import { AxisId, AxisItemIdentifier } from "../../../../models/axis.js";
export declare const selectorChartsInteractionRotationAxisIndex: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState> & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState>, number | null, [id?: AxisId | undefined]>;
export declare const selectorChartsInteractionRotationAxisIndexes: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState> & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState>, number[] | null, [ids: AxisId[]]>;
export declare const selectorChartsInteractionRotationAxisValue: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState> & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState>, any, [id?: AxisId | undefined]>;
export declare const selectorChartsInteractionRotationAxisValues: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState> & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState>, any[] | null, [ids: AxisId[]]>;
/**
 * Get rotation-axis ids and corresponding data index that should be display in the tooltip.
 */
export declare const selectorChartsInteractionTooltipRotationAxes: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState> & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState>, AxisItemIdentifier[], [ids: AxisId[]]>;
/**
 * Get radius-axis ids and corresponding data index that should be displayed in the tooltip.
 */
export declare const selectorChartsInteractionTooltipRadiusAxes: import("reselect").Selector<never, never[], never>;
/**
 * Return `true` if the axis tooltip has something to display.
 */
export declare const selectorChartsInteractionPolarAxisTooltip: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState> & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState>, boolean, [ids: AxisId[]]>;