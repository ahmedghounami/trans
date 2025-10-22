import { useChartPolarAxis } from "../internals/plugins/featurePlugins/useChartPolarAxis/index.js";
import { useChartInteraction } from "../internals/plugins/featurePlugins/useChartInteraction/index.js";
import { useChartHighlight } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
export const RADAR_PLUGINS = [useChartPolarAxis, useChartInteraction, useChartHighlight];