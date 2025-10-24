import { createSelector } from "../../utils/selectors.js";
import { selectorChartBottomAxisSize, selectorChartLeftAxisSize, selectorChartRightAxisSize, selectorChartTopAxisSize } from "../../featurePlugins/useChartCartesianAxis/useChartAxisSize.selectors.js";
export const selectorChartDimensionsState = state => state.dimensions;
export const selectorChartMargin = state => state.dimensions.margin;
const selectorChartWidth = state => state.dimensions.width;
const selectorChartHeight = state => state.dimensions.height;
const selectorChartTopMargin = state => state.dimensions.margin.top;
const selectorChartRightMargin = state => state.dimensions.margin.right;
const selectorChartBottomMargin = state => state.dimensions.margin.bottom;
const selectorChartLeftMargin = state => state.dimensions.margin.left;
export const selectorChartDrawingArea = createSelector([selectorChartWidth, selectorChartHeight, selectorChartTopMargin, selectorChartRightMargin, selectorChartBottomMargin, selectorChartLeftMargin, selectorChartTopAxisSize, selectorChartRightAxisSize, selectorChartBottomAxisSize, selectorChartLeftAxisSize], (width, height, marginTop, marginRight, marginBottom, marginLeft, axisSizeTop, axisSizeRight, axisSizeBottom, axisSizeLeft) => ({
  width: width - marginLeft - marginRight - axisSizeLeft - axisSizeRight,
  left: marginLeft + axisSizeLeft,
  right: marginRight + axisSizeRight,
  height: height - marginTop - marginBottom - axisSizeTop - axisSizeBottom,
  top: marginTop + axisSizeTop,
  bottom: marginBottom + axisSizeBottom
}));
export const selectorChartPropsSize = createSelector([selectorChartDimensionsState], dimensionsState => ({
  width: dimensionsState.propsWidth,
  height: dimensionsState.propsHeight
}));
export const selectorChartContainerSize = createSelector([selectorChartWidth, selectorChartHeight], (width, height) => ({
  width,
  height
}));