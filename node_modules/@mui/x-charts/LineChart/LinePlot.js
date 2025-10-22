"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinePlot = LinePlot;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _LineElement = require("./LineElement");
var _useSkipAnimation = require("../hooks/useSkipAnimation");
var _hooks = require("../hooks");
var _useInternalIsZoomInteracting = require("../internals/plugins/featurePlugins/useChartCartesianAxis/useInternalIsZoomInteracting");
var _useLinePlotData = require("./useLinePlotData");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["slots", "slotProps", "skipAnimation", "onItemClick"];
const LinePlotRoot = (0, _styles.styled)('g', {
  name: 'MuiAreaPlot',
  slot: 'Root'
})({
  [`& .${_LineElement.lineElementClasses.root}`]: {
    transition: 'opacity 0.2s ease-in, fill 0.2s ease-in'
  }
});
const useAggregatedData = () => {
  const {
    xAxis: xAxes
  } = (0, _hooks.useXAxes)();
  const {
    yAxis: yAxes
  } = (0, _hooks.useYAxes)();
  return (0, _useLinePlotData.useLinePlotData)(xAxes, yAxes);
};

/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Line demonstration](https://mui.com/x/react-charts/line-demo/)
 *
 * API:
 *
 * - [LinePlot API](https://mui.com/x/api/charts/line-plot/)
 */
function LinePlot(props) {
  const {
      slots,
      slotProps,
      skipAnimation: inSkipAnimation,
      onItemClick
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const isZoomInteracting = (0, _useInternalIsZoomInteracting.useInternalIsZoomInteracting)();
  const skipAnimation = (0, _useSkipAnimation.useSkipAnimation)(isZoomInteracting || inSkipAnimation);
  const completedData = useAggregatedData();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(LinePlotRoot, (0, _extends2.default)({}, other, {
    children: completedData.map(({
      d,
      seriesId,
      color,
      gradientId
    }) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineElement.LineElement, {
        id: seriesId,
        d: d,
        color: color,
        gradientId: gradientId,
        skipAnimation: skipAnimation,
        slots: slots,
        slotProps: slotProps,
        onClick: onItemClick && (event => onItemClick(event, {
          type: 'line',
          seriesId
        }))
      }, seriesId);
    })
  }));
}
process.env.NODE_ENV !== "production" ? LinePlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
   */
  onItemClick: _propTypes.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: _propTypes.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: _propTypes.default.object
} : void 0;