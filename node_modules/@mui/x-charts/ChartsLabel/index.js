"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ChartsLabelMark: true,
  labelClasses: true,
  labelMarkClasses: true,
  labelGradientClasses: true
};
Object.defineProperty(exports, "ChartsLabelMark", {
  enumerable: true,
  get: function () {
    return _ChartsLabelMark.ChartsLabelMark;
  }
});
Object.defineProperty(exports, "labelClasses", {
  enumerable: true,
  get: function () {
    return _labelClasses.labelClasses;
  }
});
Object.defineProperty(exports, "labelGradientClasses", {
  enumerable: true,
  get: function () {
    return _labelGradientClasses.labelGradientClasses;
  }
});
Object.defineProperty(exports, "labelMarkClasses", {
  enumerable: true,
  get: function () {
    return _labelMarkClasses.labelMarkClasses;
  }
});
var _ChartsLabel = require("./ChartsLabel");
Object.keys(_ChartsLabel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ChartsLabel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsLabel[key];
    }
  });
});
var _ChartsLabelMark = require("./ChartsLabelMark");
var _labelClasses = require("./labelClasses");
var _labelMarkClasses = require("./labelMarkClasses");
var _labelGradientClasses = require("./labelGradientClasses");