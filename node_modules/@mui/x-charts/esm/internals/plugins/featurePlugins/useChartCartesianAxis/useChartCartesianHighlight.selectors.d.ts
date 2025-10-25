import { AxisItemIdentifier, ChartsAxisProps } from "../../../../models/axis.js";
export declare const selectorChartsHighlightXAxisIndex: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, AxisItemIdentifier[], [id?: import("../../../index.js").AxisId | undefined]>;
export declare const selectorChartsHighlightYAxisIndex: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, AxisItemIdentifier[], [id?: import("../../../index.js").AxisId | undefined]>;
export declare const selectorChartsHighlightXAxisValue: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, {
  value: any;
  axisId: import("../../../index.js").AxisId;
  dataIndex: number;
}[] | {
  axisId: import("../../../index.js").AxisId;
  dataIndex: number | null;
  value: number | Date;
}[], [id?: import("../../../index.js").AxisId | undefined]>;
export declare const selectorChartsHighlightYAxisValue: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("../useChartInteraction/useChartInteraction.types.js").UseChartInteractionState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & Partial<{}>, {
  value: any;
  axisId: import("../../../index.js").AxisId;
  dataIndex: number;
}[] | {
  axisId: import("../../../index.js").AxisId;
  dataIndex: number | null;
  value: number | Date;
}[], [id?: import("../../../index.js").AxisId | undefined]>;
export declare const selectorChartsHighlightXAxis: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, import("../../../index.js").ComputedAxis<keyof import("../../../index.js").AxisScaleConfig, any, ChartsAxisProps>[], []>;
export declare const selectorChartsHighlightYAxis: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & Partial<import("./useChartCartesianAxis.types.js").UseChartCartesianAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, import("../../../index.js").ComputedAxis<keyof import("../../../index.js").AxisScaleConfig, any, ChartsAxisProps>[], []>;