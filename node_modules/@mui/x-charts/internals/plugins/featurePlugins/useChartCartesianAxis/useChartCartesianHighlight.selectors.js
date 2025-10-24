"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorChartsHighlightYAxisValue = exports.selectorChartsHighlightYAxisIndex = exports.selectorChartsHighlightYAxis = exports.selectorChartsHighlightXAxisValue = exports.selectorChartsHighlightXAxisIndex = exports.selectorChartsHighlightXAxis = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _selectors = require("../../utils/selectors");
var _useChartCartesianAxisRendering = require("./useChartCartesianAxisRendering.selectors");
var _useChartCartesianInteraction = require("./useChartCartesianInteraction.selectors");
const selectorChartControlledCartesianAxisHighlight = state => state.controlledCartesianAxisHighlight;
const selectAxisHighlight = (computedIndex, axis, axisItems) => {
  if (axisItems !== undefined) {
    return axisItems.filter(item => axis.axis[item.axisId] !== undefined).map(item => item);
  }
  return computedIndex === null ? [] : [{
    axisId: axis.axisIds[0],
    dataIndex: computedIndex
  }];
};
const selectorChartsHighlightXAxisIndex = exports.selectorChartsHighlightXAxisIndex = (0, _selectors.createSelector)([_useChartCartesianInteraction.selectorChartsInteractionXAxisIndex, _useChartCartesianAxisRendering.selectorChartXAxis, selectorChartControlledCartesianAxisHighlight], selectAxisHighlight);
const selectorChartsHighlightYAxisIndex = exports.selectorChartsHighlightYAxisIndex = (0, _selectors.createSelector)([_useChartCartesianInteraction.selectorChartsInteractionYAxisIndex, _useChartCartesianAxisRendering.selectorChartYAxis, selectorChartControlledCartesianAxisHighlight], selectAxisHighlight);
const selectAxisHighlightWithValue = (computedIndex, computedValue, axis, axisItems) => {
  if (axisItems !== undefined) {
    return axisItems.map(item => (0, _extends2.default)({}, item, {
      value: axis.axis[item.axisId]?.data?.[item.dataIndex]
    })).filter(({
      value
    }) => value !== undefined);
  }
  return computedValue === null ? [] : [{
    axisId: axis.axisIds[0],
    dataIndex: computedIndex,
    value: computedValue
  }];
};
const selectorChartsHighlightXAxisValue = exports.selectorChartsHighlightXAxisValue = (0, _selectors.createSelector)([_useChartCartesianInteraction.selectorChartsInteractionXAxisIndex, _useChartCartesianInteraction.selectorChartsInteractionXAxisValue, _useChartCartesianAxisRendering.selectorChartXAxis, selectorChartControlledCartesianAxisHighlight], selectAxisHighlightWithValue);
const selectorChartsHighlightYAxisValue = exports.selectorChartsHighlightYAxisValue = (0, _selectors.createSelector)([_useChartCartesianInteraction.selectorChartsInteractionYAxisIndex, _useChartCartesianInteraction.selectorChartsInteractionYAxisValue, _useChartCartesianAxisRendering.selectorChartYAxis, selectorChartControlledCartesianAxisHighlight], selectAxisHighlightWithValue);

/**
 * Get the scale of the axis with highlight if controlled. The default axis otherwise.
 * @param controlledItem The controlled value of highlightedAxis
 * @param axis The axis state after all the processing
 * @returns axis state
 */
const selectAxis = (axisItems, axis) => {
  if (axisItems === undefined) {
    return [axis.axis[axis.axisIds[0]]];
  }
  const filteredAxes = axisItems.map(item => axis.axis[item.axisId] ?? null).filter(item => item !== null);
  return filteredAxes;
};
const selectorChartsHighlightXAxis = exports.selectorChartsHighlightXAxis = (0, _selectors.createSelector)([selectorChartControlledCartesianAxisHighlight, _useChartCartesianAxisRendering.selectorChartXAxis], selectAxis);
const selectorChartsHighlightYAxis = exports.selectorChartsHighlightYAxis = (0, _selectors.createSelector)([selectorChartControlledCartesianAxisHighlight, _useChartCartesianAxisRendering.selectorChartYAxis], selectAxis);