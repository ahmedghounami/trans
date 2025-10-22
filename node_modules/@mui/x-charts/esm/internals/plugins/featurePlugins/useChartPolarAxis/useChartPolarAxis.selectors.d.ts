import { UseChartPolarAxisSignature } from "./useChartPolarAxis.types.js";
import { ChartState } from "../../models/chart.js";
export declare const selectorChartPolarAxisState: (state: ChartState<[], [UseChartPolarAxisSignature]>) => {
  rotation: import("../../../index.js").AxisConfig<import("../../../index.js").ScaleName, any, import("../../../index.js").ChartsRotationAxisProps>[];
  radius: import("../../../index.js").AxisConfig<"linear", any, import("../../../index.js").ChartsRadiusAxisProps>[];
} | undefined;
export declare const selectorChartRawRotationAxis: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, import("../../../index.js").AxisConfig<keyof import("../../../index.js").AxisScaleConfig, any, import("../../../index.js").ChartsRotationAxisProps>[] | undefined, []>;
export declare const selectorChartRawRadiusAxis: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, import("../../../index.js").AxisConfig<"linear", any, import("../../../index.js").ChartsRadiusAxisProps>[] | undefined, []>;
/**
 * The only interesting selectors that merge axis data and zoom if provided.
 */
export declare const selectorChartRotationAxis: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState>, import("./computeAxisValue.js").ComputeResult<import("../../../index.js").ChartsRotationAxisProps>, []>;
export declare const selectorChartRadiusAxis: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartPolarAxis.types.js").UseChartPolarAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState>, import("./computeAxisValue.js").ComputeResult<import("../../../index.js").ChartsRadiusAxisProps>, []>;
export declare const selectorChartPolarCenter: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("../useChartCartesianAxis/index.js").UseChartCartesianAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, {
  cx: number;
  cy: number;
}, []>;