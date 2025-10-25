"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorPreferStrictDomainInLineCharts = exports.selectorChartExperimentalFeaturesState = void 0;
var _selectors = require("../../utils/selectors");
const selectorChartExperimentalFeaturesState = state => state.experimentalFeatures;
exports.selectorChartExperimentalFeaturesState = selectorChartExperimentalFeaturesState;
const selectorPreferStrictDomainInLineCharts = exports.selectorPreferStrictDomainInLineCharts = (0, _selectors.createSelector)([selectorChartExperimentalFeaturesState], features => Boolean(features?.preferStrictDomainInLineCharts));