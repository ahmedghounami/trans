"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHART_CORE_PLUGINS = void 0;
var _useChartAnimation = require("./useChartAnimation");
var _useChartDimensions = require("./useChartDimensions");
var _useChartExperimentalFeature = require("./useChartExperimentalFeature");
var _useChartId = require("./useChartId");
var _useChartSeries = require("./useChartSeries");
var _useChartInteractionListener = require("./useChartInteractionListener");
/**
 * Internal plugins that create the tools used by the other plugins.
 * These plugins are used by the Charts components.
 */
const CHART_CORE_PLUGINS = exports.CHART_CORE_PLUGINS = [_useChartId.useChartId, _useChartExperimentalFeature.useChartExperimentalFeatures, _useChartDimensions.useChartDimensions, _useChartSeries.useChartSeries, _useChartInteractionListener.useChartInteractionListener, _useChartAnimation.useChartAnimation];