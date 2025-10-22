'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["series", "children", "width", "height", "colors", "skipAnimation", "margin", "radar", "highlight", "plugins"];
import * as React from 'react';
import { RADAR_PLUGINS } from "../RadarChart.plugins.js";
import { ChartDataProvider } from "../../ChartDataProvider/index.js";
import { defaultizeMargin } from "../../internals/defaultizeMargin.js";
import { radarSeriesConfig } from "../seriesConfig/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const RADAR_SERIES_CONFIG = {
  radar: radarSeriesConfig
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
    other = _objectWithoutPropertiesLoose(props, _excluded);
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
  const defaultizedSeries = React.useMemo(() => series.map(s => _extends({
    type: 'radar',
    highlightScope: s.highlightScope ?? (highlight === 'series' ? {
      highlight: 'series',
      fade: 'global'
    } : undefined)
  }, s)), [series, highlight]);
  const defaultizedMargin = React.useMemo(() => defaultizeMargin(margin, DEFAULT_RADAR_MARGIN), [margin]);
  return /*#__PURE__*/_jsx(ChartDataProvider, _extends({}, other, {
    series: defaultizedSeries,
    width: width,
    height: height,
    margin: defaultizedMargin,
    colors: colors,
    skipAnimation: skipAnimation,
    plugins: plugins ?? RADAR_PLUGINS,
    rotationAxis: rotationAxes,
    radiusAxis: radiusAxis,
    seriesConfig: RADAR_SERIES_CONFIG,
    children: children
  }));
}
export { RadarDataProvider };