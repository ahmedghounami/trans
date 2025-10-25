import { ChartRootSelector } from "../../utils/selectors.js";
import type { UseChartExperimentalFeaturesSignature } from "./useChartExperimentalFeature.types.js";
export declare const selectorChartExperimentalFeaturesState: ChartRootSelector<UseChartExperimentalFeaturesSignature>;
export declare const selectorPreferStrictDomainInLineCharts: import("reselect").Selector<import("../useChartId/useChartId.types.js").UseChartIdState & import("./useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("../useChartDimensions/useChartDimensions.types.js").UseChartDimensionsState & import("../useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../useChartInteractionListener/index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, boolean, any[]>;