"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortenLabels = shortenLabels;
var _clampAngle = require("../internals/clampAngle");
var _ellipsize = require("../internals/ellipsize");
var _domUtils = require("../internals/domUtils");
function shortenLabels(visibleLabels, drawingArea, maxHeight, isRtl, tickLabelStyle) {
  const shortenedLabels = new Map();
  const angle = (0, _clampAngle.clampAngle)(tickLabelStyle?.angle ?? 0);

  // Multiplying the space available to the left of the text position by leftBoundFactor returns the max width of the text.
  // Same for rightBoundFactor
  let leftBoundFactor = 1;
  let rightBoundFactor = 1;
  if (tickLabelStyle?.textAnchor === 'start') {
    leftBoundFactor = Infinity;
    rightBoundFactor = 1;
  } else if (tickLabelStyle?.textAnchor === 'end') {
    leftBoundFactor = 1;
    rightBoundFactor = Infinity;
  } else {
    leftBoundFactor = 2;
    rightBoundFactor = 2;
  }
  if (angle > 90 && angle < 270) {
    [leftBoundFactor, rightBoundFactor] = [rightBoundFactor, leftBoundFactor];
  }
  if (isRtl) {
    [leftBoundFactor, rightBoundFactor] = [rightBoundFactor, leftBoundFactor];
  }
  for (const item of visibleLabels) {
    if (item.formattedValue) {
      // That maximum width of the tick depends on its proximity to the axis bounds.
      const width = Math.min((item.offset + item.labelOffset) * leftBoundFactor, (drawingArea.left + drawingArea.width + drawingArea.right - item.offset - item.labelOffset) * rightBoundFactor);
      const doesTextFit = text => (0, _ellipsize.doesTextFitInRect)(text, {
        width,
        height: maxHeight,
        angle,
        measureText: string => (0, _domUtils.getStringSize)(string, tickLabelStyle)
      });
      shortenedLabels.set(item, (0, _ellipsize.ellipsize)(item.formattedValue.toString(), doesTextFit));
    }
  }
  return shortenedLabels;
}