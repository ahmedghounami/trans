"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorChartPropsSize = exports.selectorChartMargin = exports.selectorChartDrawingArea = exports.selectorChartDimensionsState = exports.selectorChartContainerSize = void 0;
var _selectors = require("../../utils/selectors");
var _useChartAxisSize = require("../../featurePlugins/useChartCartesianAxis/useChartAxisSize.selectors");
const selectorChartDimensionsState = state => state.dimensions;
exports.selectorChartDimensionsState = selectorChartDimensionsState;
const selectorChartMargin = state => state.dimensions.margin;
exports.selectorChartMargin = selectorChartMargin;
const selectorChartWidth = state => state.dimensions.width;
const selectorChartHeight = state => state.dimensions.height;
const selectorChartTopMargin = state => state.dimensions.margin.top;
const selectorChartRightMargin = state => state.dimensions.margin.right;
const selectorChartBottomMargin = state => state.dimensions.margin.bottom;
const selectorChartLeftMargin = state => state.dimensions.margin.left;
const selectorChartDrawingArea = exports.selectorChartDrawingArea = (0, _selectors.createSelector)([selectorChartWidth, selectorChartHeight, selectorChartTopMargin, selectorChartRightMargin, selectorChartBottomMargin, selectorChartLeftMargin, _useChartAxisSize.selectorChartTopAxisSize, _useChartAxisSize.selectorChartRightAxisSize, _useChartAxisSize.selectorChartBottomAxisSize, _useChartAxisSize.selectorChartLeftAxisSize], (width, height, marginTop, marginRight, marginBottom, marginLeft, axisSizeTop, axisSizeRight, axisSizeBottom, axisSizeLeft) => ({
  width: width - marginLeft - marginRight - axisSizeLeft - axisSizeRight,
  left: marginLeft + axisSizeLeft,
  right: marginRight + axisSizeRight,
  height: height - marginTop - marginBottom - axisSizeTop - axisSizeBottom,
  top: marginTop + axisSizeTop,
  bottom: marginBottom + axisSizeBottom
}));
const selectorChartPropsSize = exports.selectorChartPropsSize = (0, _selectors.createSelector)([selectorChartDimensionsState], dimensionsState => ({
  width: dimensionsState.propsWidth,
  height: dimensionsState.propsHeight
}));
const selectorChartContainerSize = exports.selectorChartContainerSize = (0, _selectors.createSelector)([selectorChartWidth, selectorChartHeight], (width, height) => ({
  width,
  height
}));