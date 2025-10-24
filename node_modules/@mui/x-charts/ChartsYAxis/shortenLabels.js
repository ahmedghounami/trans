"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortenLabels = shortenLabels;
var _clampAngle = require("../internals/clampAngle");
var _ellipsize = require("../internals/ellipsize");
var _domUtils = require("../internals/domUtils");
function shortenLabels(visibleLabels, drawingArea, maxWidth, isRtl, tickLabelStyle) {
  const shortenedLabels = new Map();
  const angle = (0, _clampAngle.clampAngle)(tickLabelStyle?.angle ?? 0);
  let topBoundFactor = 1;
  let bottomBoundFactor = 1;
  if (tickLabelStyle?.textAnchor === 'start') {
    topBoundFactor = Infinity;
    bottomBoundFactor = 1;
  } else if (tickLabelStyle?.textAnchor === 'end') {
    topBoundFactor = 1;
    bottomBoundFactor = Infinity;
  } else {
    topBoundFactor = 2;
    bottomBoundFactor = 2;
  }
  if (angle > 180) {
    [topBoundFactor, bottomBoundFactor] = [bottomBoundFactor, topBoundFactor];
  }
  if (isRtl) {
    [topBoundFactor, bottomBoundFactor] = [bottomBoundFactor, topBoundFactor];
  }
  for (const item of visibleLabels) {
    if (item.formattedValue) {
      // That maximum height of the tick depends on its proximity to the axis bounds.
      const height = Math.min((item.offset + item.labelOffset) * topBoundFactor, (drawingArea.top + drawingArea.height + drawingArea.bottom - item.offset - item.labelOffset) * bottomBoundFactor);
      const doesTextFit = text => (0, _ellipsize.doesTextFitInRect)(text, {
        width: maxWidth,
        height,
        angle,
        measureText: string => (0, _domUtils.getStringSize)(string, tickLabelStyle)
      });
      shortenedLabels.set(item, (0, _ellipsize.ellipsize)(item.formattedValue.toString(), doesTextFit));
    }
  }
  return shortenedLabels;
}