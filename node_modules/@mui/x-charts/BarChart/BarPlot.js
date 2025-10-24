"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarPlot = BarPlot;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _barElementClasses = require("./barElementClasses");
var _BarElement = require("./BarElement");
var _hooks = require("../hooks");
var _BarClipPath = require("./BarClipPath");
var _BarLabelPlot = require("./BarLabel/BarLabelPlot");
var _useSkipAnimation = require("../hooks/useSkipAnimation");
var _useInternalIsZoomInteracting = require("../internals/plugins/featurePlugins/useChartCartesianAxis/useInternalIsZoomInteracting");
var _useBarPlotData = require("./useBarPlotData");
var _barClasses = require("./barClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["skipAnimation", "onItemClick", "borderRadius", "barLabel"];
const BarPlotRoot = (0, _styles.styled)('g', {
  name: 'MuiBarPlot',
  slot: 'Root'
})({
  [`& .${_barElementClasses.barElementClasses.root}`]: {
    transition: 'opacity 0.2s ease-in, fill 0.2s ease-in'
  }
});

/**
 * Demos:
 *
 * - [Bars](https://mui.com/x/react-charts/bars/)
 * - [Bar demonstration](https://mui.com/x/react-charts/bar-demo/)
 * - [Stacking](https://mui.com/x/react-charts/stacking/)
 *
 * API:
 *
 * - [BarPlot API](https://mui.com/x/api/charts/bar-plot/)
 */
function BarPlot(props) {
  const {
      skipAnimation: inSkipAnimation,
      onItemClick,
      borderRadius,
      barLabel
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const isZoomInteracting = (0, _useInternalIsZoomInteracting.useInternalIsZoomInteracting)();
  const skipAnimation = (0, _useSkipAnimation.useSkipAnimation)(isZoomInteracting || inSkipAnimation);
  const {
    xAxis: xAxes
  } = (0, _hooks.useXAxes)();
  const {
    yAxis: yAxes
  } = (0, _hooks.useYAxes)();
  const {
    completedData,
    masksData
  } = (0, _useBarPlotData.useBarPlotData)((0, _hooks.useDrawingArea)(), xAxes, yAxes);
  const withoutBorderRadius = !borderRadius || borderRadius <= 0;
  const classes = (0, _barClasses.useUtilityClasses)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(BarPlotRoot, {
    className: classes.root,
    children: [!withoutBorderRadius && masksData.map(({
      id,
      x,
      y,
      xOrigin,
      yOrigin,
      width,
      height,
      hasPositive,
      hasNegative,
      layout
    }) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BarClipPath.BarClipPath, {
        maskId: id,
        borderRadius: borderRadius,
        hasNegative: hasNegative,
        hasPositive: hasPositive,
        layout: layout,
        x: x,
        y: y,
        xOrigin: xOrigin,
        yOrigin: yOrigin,
        width: width,
        height: height,
        skipAnimation: skipAnimation ?? false
      }, id);
    }), completedData.map(({
      seriesId,
      data
    }) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        "data-series": seriesId,
        className: classes.series,
        children: data.map(({
          dataIndex,
          color,
          maskId,
          layout,
          x,
          xOrigin,
          y,
          yOrigin,
          width,
          height
        }) => {
          const barElement = /*#__PURE__*/(0, _jsxRuntime.jsx)(_BarElement.BarElement, (0, _extends2.default)({
            id: seriesId,
            dataIndex: dataIndex,
            color: color,
            skipAnimation: skipAnimation ?? false,
            layout: layout ?? 'vertical',
            x: x,
            xOrigin: xOrigin,
            y: y,
            yOrigin: yOrigin,
            width: width,
            height: height
          }, other, {
            onClick: onItemClick && (event => {
              onItemClick(event, {
                type: 'bar',
                seriesId,
                dataIndex
              });
            })
          }), dataIndex);
          if (withoutBorderRadius) {
            return barElement;
          }
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
            clipPath: `url(#${maskId})`,
            children: barElement
          }, dataIndex);
        })
      }, seriesId);
    }), barLabel && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BarLabelPlot.BarLabelPlot, (0, _extends2.default)({
      bars: completedData,
      skipAnimation: skipAnimation,
      barLabel: barLabel
    }, other))]
  });
}
process.env.NODE_ENV !== "production" ? BarPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If provided, the function will be used to format the label of the bar.
   * It can be set to 'value' to display the current value.
   * @param {BarItem} item The item to format.
   * @param {BarLabelContext} context data about the bar.
   * @returns {string} The formatted label.
   */
  barLabel: _propTypes.default.oneOfType([_propTypes.default.oneOf(['value']), _propTypes.default.func]),
  /**
   * Defines the border radius of the bar element.
   */
  borderRadius: _propTypes.default.number,
  /**
   * Callback fired when a bar item is clicked.
   * @param {React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
   * @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
   */
  onItemClick: _propTypes.default.func,
  /**
   * If `true`, animations are skipped.
   * @default undefined
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