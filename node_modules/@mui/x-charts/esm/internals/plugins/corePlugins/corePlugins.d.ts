import { type UseChartAnimationSignature } from "./useChartAnimation/index.js";
import { type UseChartDimensionsSignature } from "./useChartDimensions/index.js";
import { type UseChartExperimentalFeaturesSignature } from "./useChartExperimentalFeature/index.js";
import { type UseChartIdSignature, UseChartIdParameters } from "./useChartId/index.js";
import { type UseChartSeriesSignature } from "./useChartSeries/index.js";
import { type UseChartInteractionListenerSignature } from "./useChartInteractionListener/index.js";
/**
 * Internal plugins that create the tools used by the other plugins.
 * These plugins are used by the Charts components.
 */
export declare const CHART_CORE_PLUGINS: readonly [import("../models/index.js").ChartPlugin<UseChartIdSignature>, import("../models/index.js").ChartPlugin<UseChartExperimentalFeaturesSignature>, import("../models/index.js").ChartPlugin<UseChartDimensionsSignature>, import("../models/index.js").ChartPlugin<UseChartSeriesSignature>, import("../models/index.js").ChartPlugin<UseChartInteractionListenerSignature>, import("../models/index.js").ChartPlugin<UseChartAnimationSignature>];
export type ChartCorePluginSignatures = [UseChartIdSignature, UseChartExperimentalFeaturesSignature, UseChartDimensionsSignature, UseChartSeriesSignature, UseChartAnimationSignature, UseChartInteractionListenerSignature];
export interface ChartCorePluginParameters extends UseChartIdParameters {}