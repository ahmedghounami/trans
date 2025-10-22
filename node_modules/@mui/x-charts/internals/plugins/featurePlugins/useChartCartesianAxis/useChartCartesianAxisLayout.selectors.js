"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorChartRawYAxis = exports.selectorChartRawXAxis = exports.selectorChartCartesianAxisState = void 0;
const selectorChartCartesianAxisState = state => state.cartesianAxis;
exports.selectorChartCartesianAxisState = selectorChartCartesianAxisState;
const selectorChartRawXAxis = state => state.cartesianAxis?.x;
exports.selectorChartRawXAxis = selectorChartRawXAxis;
const selectorChartRawYAxis = state => state.cartesianAxis?.y;
exports.selectorChartRawYAxis = selectorChartRawYAxis;