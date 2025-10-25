import { ChartRootSelector } from "../../utils/selectors.js";
import type { UseChartDimensionsSignature } from "./useChartDimensions.types.js";
import { ChartState } from "../../models/chart.js";
export declare const selectorChartDimensionsState: ChartRootSelector<UseChartDimensionsSignature>;
export declare const selectorChartMargin: (state: ChartState<[UseChartDimensionsSignature]>) => import("./useChartDimensions.types.js").ChartMargin;
export declare const selectorChartDrawingArea: import("reselect").Selector<import("../useChartId/useChartId.types.js").UseChartIdState & import("../useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("./useChartDimensions.types.js").UseChartDimensionsState & import("../useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../useChartInteractionListener/index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & Partial<import("../../../index.js").UseChartCartesianAxisState> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, {
  width: number;
  left: number;
  right: number;
  height: number;
  top: number;
  bottom: number;
}, []>;
export declare const selectorChartPropsSize: import("reselect").Selector<import("../useChartId/useChartId.types.js").UseChartIdState & import("../useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("./useChartDimensions.types.js").UseChartDimensionsState & import("../useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../useChartInteractionListener/index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, {
  width: number | undefined;
  height: number | undefined;
}, any[]>;
export declare const selectorChartContainerSize: import("reselect").Selector<import("../useChartId/useChartId.types.js").UseChartIdState & import("../useChartExperimentalFeature/useChartExperimentalFeature.types.js").UseChartExperimentalFeaturesState & import("./useChartDimensions.types.js").UseChartDimensionsState & import("../useChartSeries/useChartSeries.types.js").UseChartSeriesState<keyof import("../../../index.js").ChartsSeriesConfig> & import("../useChartAnimation/useChartAnimation.types.js").UseChartAnimationState & import("../useChartInteractionListener/index.js").UseChartInteractionListenerState & Partial<{}> & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
} & {
  cacheKey: import("../../models/index.js").ChartStateCacheKey;
}, {
  width: number;
  height: number;
}, []>;