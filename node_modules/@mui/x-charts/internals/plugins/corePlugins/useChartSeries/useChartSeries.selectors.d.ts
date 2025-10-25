import { ChartRootSelector } from "../../utils/selectors.js";
import { UseChartSeriesSignature } from "./useChartSeries.types.js";
export declare const selectorChartSeriesState: ChartRootSelector<UseChartSeriesSignature>;
export declare const selectorChartSeriesProcessed: import("reselect").Selector<import("../useChartId/useChartId.types.js").UseChartIdState & import("../useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("./useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../useChartInteractionListener/index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, import("./useChartSeries.types.js").ProcessedSeries<keyof import("../../../index.js").ChartsSeriesConfig>, any[]>;
export declare const selectorChartSeriesConfig: import("reselect").Selector<import("../useChartId/useChartId.types.js").UseChartIdState & import("../useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("./useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../useChartInteractionListener/index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, import("../../models/index.js").ChartSeriesConfig<keyof import("../../../index.js").ChartsSeriesConfig>, any[]>;