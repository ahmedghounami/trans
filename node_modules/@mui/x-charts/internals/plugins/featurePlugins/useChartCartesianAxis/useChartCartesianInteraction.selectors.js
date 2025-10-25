"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorChartsInteractionYAxisValue = exports.selectorChartsInteractionYAxisIndex = exports.selectorChartsInteractionXAxisValue = exports.selectorChartsInteractionXAxisIndex = exports.selectorChartsInteractionTooltipYAxes = exports.selectorChartsInteractionTooltipXAxes = exports.selectorChartsInteractionAxisTooltip = exports.selectorChartAxisInteraction = exports.selectChartsInteractionAxisIndex = void 0;
var _isDeepEqual = require("@mui/x-internals/isDeepEqual");
var _selectors = require("../../utils/selectors");
var _useChartInteraction = require("../useChartInteraction/useChartInteraction.selectors");
var _getAxisValue = require("./getAxisValue");
var _useChartCartesianAxisRendering = require("./useChartCartesianAxisRendering.selectors");
const optionalGetAxisId = (_, id) => id;

/**
 * Get interaction indexes
 */

function indexGetter(value, axes, ids = axes.axisIds[0]) {
  return Array.isArray(ids) ? ids.map(id => (0, _getAxisValue.getAxisIndex)(axes.axis[id], value)) : (0, _getAxisValue.getAxisIndex)(axes.axis[ids], value);
}
const selectChartsInteractionAxisIndex = (value, axes, id) => {
  if (value === null) {
    return null;
  }
  const index = indexGetter(value, axes, id);
  return index === -1 ? null : index;
};
exports.selectChartsInteractionAxisIndex = selectChartsInteractionAxisIndex;
const selectorChartsInteractionXAxisIndex = exports.selectorChartsInteractionXAxisIndex = (0, _selectors.createSelector)([_useChartInteraction.selectorChartsInteractionPointerX, _useChartCartesianAxisRendering.selectorChartXAxis, optionalGetAxisId], selectChartsInteractionAxisIndex);
const selectorChartsInteractionYAxisIndex = exports.selectorChartsInteractionYAxisIndex = (0, _selectors.createSelector)([_useChartInteraction.selectorChartsInteractionPointerY, _useChartCartesianAxisRendering.selectorChartYAxis, optionalGetAxisId], selectChartsInteractionAxisIndex);
const selectorChartAxisInteraction = exports.selectorChartAxisInteraction = (0, _selectors.createSelector)([_useChartInteraction.selectorChartsInteractionPointerX, _useChartInteraction.selectorChartsInteractionPointerY, _useChartCartesianAxisRendering.selectorChartXAxis, _useChartCartesianAxisRendering.selectorChartYAxis], (x, y, xAxis, yAxis) => [...(x === null ? [] : xAxis.axisIds.map(axisId => ({
  axisId,
  dataIndex: indexGetter(x, xAxis, axisId)
}))), ...(y === null ? [] : yAxis.axisIds.map(axisId => ({
  axisId,
  dataIndex: indexGetter(y, yAxis, axisId)
})))].filter(item => item.dataIndex !== null && item.dataIndex >= 0));

/**
 * Get interaction values
 */

function valueGetter(value, axes, indexes, ids = axes.axisIds[0]) {
  return Array.isArray(ids) ? ids.map((id, axisIndex) => (0, _getAxisValue.getAxisValue)(axes.axis[id], value, indexes[axisIndex])) : (0, _getAxisValue.getAxisValue)(axes.axis[ids], value, indexes);
}
const selectorChartsInteractionXAxisValue = exports.selectorChartsInteractionXAxisValue = (0, _selectors.createSelector)([_useChartInteraction.selectorChartsInteractionPointerX, _useChartCartesianAxisRendering.selectorChartXAxis, selectorChartsInteractionXAxisIndex, optionalGetAxisId], (x, xAxes, xIndex, id) => {
  if (x === null || xAxes.axisIds.length === 0) {
    return null;
  }
  return valueGetter(x, xAxes, xIndex, id);
});
const selectorChartsInteractionYAxisValue = exports.selectorChartsInteractionYAxisValue = (0, _selectors.createSelector)([_useChartInteraction.selectorChartsInteractionPointerY, _useChartCartesianAxisRendering.selectorChartYAxis, selectorChartsInteractionYAxisIndex, optionalGetAxisId], (y, yAxes, yIndex, id) => {
  if (y === null || yAxes.axisIds.length === 0) {
    return null;
  }
  return valueGetter(y, yAxes, yIndex, id);
});

/**
 * Get x-axis ids and corresponding data index that should be display in the tooltip.
 */
const selectorChartsInteractionTooltipXAxes = exports.selectorChartsInteractionTooltipXAxes = (0, _selectors.createSelector)([_useChartInteraction.selectorChartsInteractionPointerX, _useChartCartesianAxisRendering.selectorChartXAxis], (value, axes) => {
  if (value === null) {
    return [];
  }
  return axes.axisIds.filter(id => axes.axis[id].triggerTooltip).map(axisId => ({
    axisId,
    dataIndex: (0, _getAxisValue.getAxisIndex)(axes.axis[axisId], value)
  })).filter(({
    dataIndex
  }) => dataIndex >= 0);
}, {
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: _isDeepEqual.isDeepEqual
  }
});

/**
 * Get y-axis ids and corresponding data index that should be display in the tooltip.
 */
const selectorChartsInteractionTooltipYAxes = exports.selectorChartsInteractionTooltipYAxes = (0, _selectors.createSelector)([_useChartInteraction.selectorChartsInteractionPointerY, _useChartCartesianAxisRendering.selectorChartYAxis], (value, axes) => {
  if (value === null) {
    return [];
  }
  return axes.axisIds.filter(id => axes.axis[id].triggerTooltip).map(axisId => ({
    axisId,
    dataIndex: (0, _getAxisValue.getAxisIndex)(axes.axis[axisId], value)
  })).filter(({
    dataIndex
  }) => dataIndex >= 0);
}, {
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: _isDeepEqual.isDeepEqual
  }
});

/**
 * Return `true` if the axis tooltip has something to display.
 */
const selectorChartsInteractionAxisTooltip = exports.selectorChartsInteractionAxisTooltip = (0, _selectors.createSelector)([selectorChartsInteractionTooltipXAxes, selectorChartsInteractionTooltipYAxes], (xTooltip, yTooltip) => xTooltip.length > 0 || yTooltip.length > 0);