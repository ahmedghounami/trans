"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadarDataProvider = RadarDataProvider;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _RadarChart = require("../RadarChart.plugins");
var _ChartDataProvider = require("../../ChartDataProvider");
var _defaultizeMargin = require("../../internals/defaultizeMargin");
var _seriesConfig = require("../seriesConfig");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["series", "children", "width", "height", "colors", "skipAnimation", "margin", "radar", "highlight", "plugins"];
const RADAR_SERIES_CONFIG = {
  radar: _seriesConfig.radarSeriesConfig
};
const DEFAULT_RADAR_MARGIN = {
  top: 30,
  bottom: 30,
  left: 50,
  right: 50
};
function RadarDataProvider(props) {
  const {
      series,
      children,
      width,
      height,
      colors,
      skipAnimation,
      margin,
      radar,
      highlight,
      plugins
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rotationAxes = React.useMemo(() => [{
    id: 'radar-rotation-axis',
    scaleType: 'point',
    data: radar.metrics.map(metric => typeof metric === 'string' ? metric : metric.name),
    startAngle: radar.startAngle,
    endAngle: radar.startAngle !== undefined ? radar.startAngle + 360 : undefined,
    labelGap: radar.labelGap,
    valueFormatter: (name, {
      location
    }) => radar.labelFormatter?.(name, {
      location: location
    }) ?? name
  }], [radar]);
  const radiusAxis = React.useMemo(() => radar.metrics.map(m => {
    const {
      name,
      min = 0,
      max = radar.max
    } = typeof m === 'string' ? {
      name: m
    } : m;
    return {
      id: name,
      label: name,
      scaleType: 'linear',
      min,
      max
    };
  }), [radar]);
  const defaultizedSeries = React.useMemo(() => series.map(s => (0, _extends2.default)({
    type: 'radar',
    highlightScope: s.highlightScope ?? (highlight === 'series' ? {
      highlight: 'series',
      fade: 'global'
    } : undefined)
  }, s)), [series, highlight]);
  const defaultizedMargin = React.useMemo(() => (0, _defaultizeMargin.defaultizeMargin)(margin, DEFAULT_RADAR_MARGIN), [margin]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartDataProvider.ChartDataProvider, (0, _extends2.default)({}, other, {
    series: defaultizedSeries,
    width: width,
    height: height,
    margin: defaultizedMargin,
    colors: colors,
    skipAnimation: skipAnimation,
    plugins: plugins ?? _RadarChart.RADAR_PLUGINS,
    rotationAxis: rotationAxes,
    radiusAxis: radiusAxis,
    seriesConfig: RADAR_SERIES_CONFIG,
    children: children
  }));
}