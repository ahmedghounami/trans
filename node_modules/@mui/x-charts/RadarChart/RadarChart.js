"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadarChart = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _ChartsLegend = require("../ChartsLegend");
var _ChartsOverlay = require("../ChartsOverlay/ChartsOverlay");
var _useRadarChartProps = require("./useRadarChartProps");
var _ChartsSurface = require("../ChartsSurface");
var _ChartsWrapper = require("../ChartsWrapper");
var _RadarGrid = require("./RadarGrid");
var _RadarDataProvider = require("./RadarDataProvider/RadarDataProvider");
var _RadarSeriesPlot = require("./RadarSeriesPlot");
var _RadarAxisHighlight = require("./RadarAxisHighlight");
var _RadarMetricLabels = require("./RadarMetricLabels");
var _ChartsTooltip = require("../ChartsTooltip");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Demos:
 *
 * - [Radar Chart](https://mui.com/x/react-charts/radar/)
 *
 * API:
 *
 * - [RadarChart API](https://mui.com/x/api/charts/radar-chart/)
 */
const RadarChart = exports.RadarChart = /*#__PURE__*/React.forwardRef(function RadarChart(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiRadarChart'
  });
  const {
    chartsWrapperProps,
    chartsSurfaceProps,
    radarDataProviderProps,
    radarGrid,
    radarSeriesAreaProps,
    radarSeriesMarksProps,
    overlayProps,
    legendProps,
    highlight,
    children
  } = (0, _useRadarChartProps.useRadarChartProps)(props);
  const Tooltip = props.slots?.tooltip ?? _ChartsTooltip.ChartsTooltip;
  const Toolbar = props.slots?.toolbar;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadarDataProvider.RadarDataProvider, (0, _extends2.default)({}, radarDataProviderProps, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartsWrapper.ChartsWrapper, (0, _extends2.default)({}, chartsWrapperProps, {
      children: [props.showToolbar && Toolbar ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Toolbar, (0, _extends2.default)({}, props.slotProps?.toolbar)) : null, !props.hideLegend && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsLegend.ChartsLegend, (0, _extends2.default)({}, legendProps)), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartsSurface.ChartsSurface, (0, _extends2.default)({}, chartsSurfaceProps, {
        ref: ref,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RadarGrid.RadarGrid, (0, _extends2.default)({}, radarGrid)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadarMetricLabels.RadarMetricLabels, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadarSeriesPlot.RadarSeriesArea, (0, _extends2.default)({}, radarSeriesAreaProps)), highlight === 'axis' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadarAxisHighlight.RadarAxisHighlight, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadarSeriesPlot.RadarSeriesMarks, (0, _extends2.default)({}, radarSeriesMarksProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsOverlay.ChartsOverlay, (0, _extends2.default)({}, overlayProps)), children]
      })), !props.loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(Tooltip, (0, _extends2.default)({}, props.slotProps?.tooltip))]
    }))
  }));
});
if (process.env.NODE_ENV !== "production") RadarChart.displayName = "RadarChart";
process.env.NODE_ENV !== "production" ? RadarChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: _propTypes.default.shape({
    current: _propTypes.default.object
  }),
  className: _propTypes.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default rainbowSurgePalette
   */
  colors: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.func]),
  desc: _propTypes.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: _propTypes.default.bool,
  /**
   * The number of divisions in the radar grid.
   * @default 5
   */
  divisions: _propTypes.default.number,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: _propTypes.default.number,
  /**
   * If `true`, the legend is not rendered.
   */
  hideLegend: _propTypes.default.bool,
  /**
   * Indicates if the chart should highlight items per axis or per series.
   * @default 'axis'
   */
  highlight: _propTypes.default.oneOf(['axis', 'none', 'series']),
  /**
   * The highlighted item.
   * Used when the highlight is controlled.
   */
  highlightedItem: _propTypes.default.shape({
    dataIndex: _propTypes.default.number,
    seriesId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired
  }),
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: _propTypes.default.string,
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: _propTypes.default.bool,
  /**
   * Localized text for chart components.
   */
  localeText: _propTypes.default.object,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   *
   * Accepts a `number` to be used on all sides or an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   */
  margin: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    bottom: _propTypes.default.number,
    left: _propTypes.default.number,
    right: _propTypes.default.number,
    top: _propTypes.default.number
  })]),
  /**
   * Callback fired when an area is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onAreaClick: _propTypes.default.func,
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | ChartsAxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: _propTypes.default.func,
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: _propTypes.default.func,
  /**
   * Callback fired when a mark is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onMarkClick: _propTypes.default.func,
  /**
   * The configuration of the radar scales.
   */
  radar: _propTypes.default.shape({
    labelFormatter: _propTypes.default.func,
    labelGap: _propTypes.default.number,
    max: _propTypes.default.number,
    metrics: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.arrayOf(_propTypes.default.shape({
      max: _propTypes.default.number,
      min: _propTypes.default.number,
      name: _propTypes.default.string.isRequired
    }))]).isRequired,
    startAngle: _propTypes.default.number
  }).isRequired,
  /**
   * The series to display in the bar chart.
   * An array of [[RadarSeries]] objects.
   */
  series: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  /**
   * The grid shape.
   * @default 'sharp'
   */
  shape: _propTypes.default.oneOf(['circular', 'sharp']),
  /**
   * If true, shows the default chart toolbar.
   * @default false
   */
  showToolbar: _propTypes.default.bool,
  /**
   * If `true`, animations are skipped.
   * If unset or `false`, the animations respects the user's `prefers-reduced-motion` setting.
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
  slots: _propTypes.default.object,
  /**
   * Get stripe fill color. Set it to `null` to remove stripes
   * @param {number} index The index of the stripe band.
   * @returns {string} The color to fill the stripe.
   * @default (index) => index % 2 === 1 ? (theme.vars || theme).palette.text.secondary : 'none'
   */
  stripeColor: _propTypes.default.func,
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  theme: _propTypes.default.oneOf(['dark', 'light']),
  title: _propTypes.default.string,
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: _propTypes.default.number
} : void 0;