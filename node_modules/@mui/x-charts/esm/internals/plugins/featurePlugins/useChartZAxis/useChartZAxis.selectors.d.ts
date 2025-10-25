export declare const selectorChartZAxis: import("reselect").Selector<import("../../corePlugins/useChartId/useChartId.types.js").UseChartIdState & import("../../corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../../corePlugins/useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../../corePlugins/useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../../corePlugins/useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../../../index.js").UseChartInteractionListenerState & import("./useChartZAxis.types.js").UseChartZAxisState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, {
  axis: {
    [axisId: string]: import("../../../index.js").ZAxisDefaultized;
  };
  axisIds: import("../../../index.js").AxisId[];
}, []>;