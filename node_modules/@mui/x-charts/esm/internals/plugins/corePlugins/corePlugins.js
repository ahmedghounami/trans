import { useChartAnimation } from "./useChartAnimation/index.js";
import { useChartDimensions } from "./useChartDimensions/index.js";
import { useChartExperimentalFeatures } from "./useChartExperimentalFeature/index.js";
import { useChartId } from "./useChartId/index.js";
import { useChartSeries } from "./useChartSeries/index.js";
import { useChartInteractionListener } from "./useChartInteractionListener/index.js";

/**
 * Internal plugins that create the tools used by the other plugins.
 * These plugins are used by the Charts components.
 */
export const CHART_CORE_PLUGINS = [useChartId, useChartExperimentalFeatures, useChartDimensions, useChartSeries, useChartInteractionListener, useChartAnimation];