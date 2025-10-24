"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useChartExperimentalFeatures: true
};
Object.defineProperty(exports, "useChartExperimentalFeatures", {
  enumerable: true,
  get: function () {
    return _useChartExperimentalFeature.useChartExperimentalFeatures;
  }
});
var _useChartExperimentalFeature = require("./useChartExperimentalFeature");
var _useChartExperimentalFeature2 = require("./useChartExperimentalFeature.selectors");
Object.keys(_useChartExperimentalFeature2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useChartExperimentalFeature2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useChartExperimentalFeature2[key];
    }
  });
});