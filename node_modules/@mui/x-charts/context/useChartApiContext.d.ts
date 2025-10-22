import * as React from 'react';
import { ChartApi } from "./ChartApi.js";
/**
 * The `useChartApiContext` hook provides access to the chart API.
 * This is only available when the chart is rendered within a chart or a `ChartDataProvider` component.
 * If you want to access the chart API outside those components, you should use the `apiRef` prop instead.
 * @example
 * const apiRef = useChartApiContext<ChartApi<'bar'>>();
 */
export declare function useChartApiContext<Api extends ChartApi>(): React.RefObject<Api>;