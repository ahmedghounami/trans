"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChartApiContext = useChartApiContext;
var React = _interopRequireWildcard(require("react"));
var _ChartProvider = require("./ChartProvider");
/**
 * The `useChartApiContext` hook provides access to the chart API.
 * This is only available when the chart is rendered within a chart or a `ChartDataProvider` component.
 * If you want to access the chart API outside those components, you should use the `apiRef` prop instead.
 * @example
 * const apiRef = useChartApiContext<ChartApi<'bar'>>();
 */
function useChartApiContext() {
  const {
    publicAPI
  } = (0, _ChartProvider.useChartContext)();
  const apiRef = React.useRef(publicAPI);
  React.useEffect(() => {
    apiRef.current = publicAPI;
  }, [publicAPI]);
  return apiRef;
}