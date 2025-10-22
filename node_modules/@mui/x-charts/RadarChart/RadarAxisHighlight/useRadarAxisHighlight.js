"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRadarAxisHighlight = useRadarAxisHighlight;
var _useAxis = require("../../hooks/useAxis");
var _useRadarSeries = require("../../hooks/useRadarSeries");
var _useScale = require("../../hooks/useScale");
var _useSelector = require("../../internals/store/useSelector");
var _useStore = require("../../internals/store/useStore");
var _useChartContext = require("../../context/ChartProvider/useChartContext");
var _useChartPolarAxis = require("../../internals/plugins/featurePlugins/useChartPolarAxis");
var _useChartPolarInteraction = require("../../internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarInteraction.selectors");
function useRadarAxisHighlight() {
  const radarSeries = (0, _useRadarSeries.useRadarSeries)();
  const rotationScale = (0, _useScale.useRotationScale)();
  const {
    radiusAxis,
    radiusAxisIds
  } = (0, _useAxis.useRadiusAxes)();
  const {
    instance
  } = (0, _useChartContext.useChartContext)();
  const store = (0, _useStore.useStore)();
  const rotationAxisIndex = (0, _useSelector.useSelector)(store, _useChartPolarInteraction.selectorChartsInteractionRotationAxisIndex);
  const rotationAxisValue = (0, _useSelector.useSelector)(store, _useChartPolarInteraction.selectorChartsInteractionRotationAxisValue);
  const center = (0, _useSelector.useSelector)(store, _useChartPolarAxis.selectorChartPolarCenter);
  const highlightedIndex = rotationAxisIndex;
  if (!rotationScale) {
    return null;
  }
  if (highlightedIndex === null || highlightedIndex === -1) {
    return null;
  }
  if (radarSeries === undefined || radarSeries.length === 0) {
    return null;
  }
  const metric = radiusAxisIds[highlightedIndex];
  const radiusScale = radiusAxis[metric].scale;
  const angle = rotationScale(rotationAxisValue);
  const radius = radiusScale.range()[1];
  return {
    center,
    radius,
    instance,
    highlightedIndex,
    highlightedMetric: metric,
    highlightedAngle: angle,
    series: radarSeries,
    points: radarSeries.map(series => {
      const value = series.data[highlightedIndex];
      const r = radiusScale(value);
      const [x, y] = instance.polar2svg(r, angle);
      const returnedValue = {
        x,
        y,
        r,
        angle,
        value
      };
      return returnedValue;
    })
  };
}