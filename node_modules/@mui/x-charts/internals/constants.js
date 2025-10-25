"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZOOM_SLIDER_PREVIEW_SIZE = exports.ZOOM_SLIDER_MARGIN = exports.DEFAULT_ZOOM_SLIDER_SIZE = exports.DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP = exports.DEFAULT_ZOOM_SLIDER_PREVIEW_SIZE = exports.DEFAULT_PIE_CHART_MARGIN = void 0;
/** Margin in the opposite direction of the axis, i.e., horizontal if the axis is vertical and vice versa. */
const ZOOM_SLIDER_MARGIN = exports.ZOOM_SLIDER_MARGIN = 4;

/** Size of the zoom slider preview. */
const ZOOM_SLIDER_PREVIEW_SIZE = exports.ZOOM_SLIDER_PREVIEW_SIZE = 40;

/** Size reserved for the zoom slider. The actual size of the slider might be smaller. */
const DEFAULT_ZOOM_SLIDER_SIZE = exports.DEFAULT_ZOOM_SLIDER_SIZE = 20 + 2 * ZOOM_SLIDER_MARGIN;
const DEFAULT_ZOOM_SLIDER_PREVIEW_SIZE = exports.DEFAULT_ZOOM_SLIDER_PREVIEW_SIZE = 40 + 2 * ZOOM_SLIDER_MARGIN;
const DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP = exports.DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP = 'hover';

/** Default margin for pie charts. */
const DEFAULT_PIE_CHART_MARGIN = exports.DEFAULT_PIE_CHART_MARGIN = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5
};