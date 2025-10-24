import type { ChartApi as ChartApiOriginal, PluginsPerSeriesType } from "../context/ChartApi.js";
import type { ChartAnyPluginSignature } from "../internals/plugins/models/plugin.js";
import type { AllPluginSignatures } from "../internals/plugins/allPlugins.js";
export * from "./ChartContainer.js";
/**
 * @deprecated Use `ChartApi` from `@mui/x-charts/context` instead.
 */
export type ChartApi<TSeries extends keyof PluginsPerSeriesType | undefined = undefined, TSignatures extends readonly ChartAnyPluginSignature[] = (TSeries extends keyof PluginsPerSeriesType ? PluginsPerSeriesType[TSeries] : AllPluginSignatures)> = ChartApiOriginal<TSeries, TSignatures>;