/**
 * Get the id attribute of the chart.
 * @param {ChartState<[UseChartIdSignature]>} state The state of the chart.
 * @returns {string} The id attribute of the chart.
 */
export declare const selectorChartId: import("reselect").Selector<import("./useChartId.types.js").UseChartIdState & import("../useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../useChartInteractionListener/index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, string | undefined, any[]>;