"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RADAR_PLUGINS = void 0;
var _useChartPolarAxis = require("../internals/plugins/featurePlugins/useChartPolarAxis");
var _useChartInteraction = require("../internals/plugins/featurePlugins/useChartInteraction");
var _useChartHighlight = require("../internals/plugins/featurePlugins/useChartHighlight");
const RADAR_PLUGINS = exports.RADAR_PLUGINS = [_useChartPolarAxis.useChartPolarAxis, _useChartInteraction.useChartInteraction, _useChartHighlight.useChartHighlight];