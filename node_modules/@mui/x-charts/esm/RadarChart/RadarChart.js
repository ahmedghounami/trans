'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useThemeProps } from '@mui/material/styles';
import { ChartsLegend } from "../ChartsLegend/index.js";
import { ChartsOverlay } from "../ChartsOverlay/ChartsOverlay.js";
import { useRadarChartProps } from "./useRadarChartProps.js";
import { ChartsSurface } from "../ChartsSurface/index.js";
import { ChartsWrapper } from "../ChartsWrapper/index.js";
import { RadarGrid } from "./RadarGrid/index.js";
import { RadarDataProvider } from "./RadarDataProvider/RadarDataProvider.js";
import { RadarSeriesArea, RadarSeriesMarks } from "./RadarSeriesPlot/index.js";
import { RadarAxisHighlight } from "./RadarAxisHighlight/index.js";
import { RadarMetricLabels } from "./RadarMetricLabels/index.js";
import { ChartsTooltip } from "../ChartsTooltip/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Demos:
 *
 * - [Radar Chart](https://mui.com/x/react-charts/radar/)
 *
 * API:
 *
 * - [RadarChart API](https://mui.com/x/api/charts/radar-chart/)
 */
const RadarChart = /*#__PURE__*/React.forwardRef(function RadarChart(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiRadarChart'
  });
  const {
    chartsWrapperProps,
    chartsSurfaceProps,
    radarDataProviderProps,
    radarGrid,
    radarSeriesAreaProps,
    radarSeriesMarksProps,
    overlayProps,
    legendProps,
    highlight,
    children
  } = useRadarChartProps(props);
  const Tooltip = props.slots?.tooltip ?? ChartsTooltip;
  const Toolbar = props.slots?.toolbar;
  return /*#__PURE__*/_jsx(RadarDataProvider, _extends({}, radarDataProviderProps, {
    children: /*#__PURE__*/_jsxs(ChartsWrapper, _extends({}, chartsWrapperProps, {
      children: [props.showToolbar && Toolbar ? /*#__PURE__*/_jsx(Toolbar, _extends({}, props.slotProps?.toolbar)) : null, !props.hideLegend && /*#__PURE__*/_jsx(ChartsLegend, _extends({}, legendProps)), /*#__PURE__*/_jsxs(ChartsSurface, _extends({}, chartsSurfaceProps, {
        ref: ref,
        children: [/*#__PURE__*/_jsx(RadarGrid, _extends({}, radarGrid)), /*#__PURE__*/_jsx(RadarMetricLabels, {}), /*#__PURE__*/_jsx(RadarSeriesArea, _extends({}, radarSeriesAreaProps)), highlight === 'axis' && /*#__PURE__*/_jsx(RadarAxisHighlight, {}), /*#__PURE__*/_jsx(RadarSeriesMarks, _extends({}, radarSeriesMarksProps)), /*#__PURE__*/_jsx(ChartsOverlay, _extends({}, overlayProps)), children]
      })), !props.loading && /*#__PURE__*/_jsx(Tooltip, _extends({}, props.slotProps?.tooltip))]
    }))
  }));
});
if (process.env.NODE_ENV !== "production") RadarChart.displayName = "RadarChart";
process.env.NODE_ENV !== "production" ? RadarChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.shape({
    current: PropTypes.object
  }),
  className: PropTypes.string,
  /**
   * Color palette used to colorize multiple series.
   * @default rainbowSurgePalette
   */
  colors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  desc: PropTypes.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: PropTypes.bool,
  /**
   * The number of divisions in the radar grid.
   * @default 5
   */
  divisions: PropTypes.number,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: PropTypes.number,
  /**
   * If `true`, the legend is not rendered.
   */
  hideLegend: PropTypes.bool,
  /**
   * Indicates if the chart should highlight items per axis or per series.
   * @default 'axis'
   */
  highlight: PropTypes.oneOf(['axis', 'none', 'series']),
  /**
   * The highlighted item.
   * Used when the highlight is controlled.
   */
  highlightedItem: PropTypes.shape({
    dataIndex: PropTypes.number,
    seriesId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  }),
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Localized text for chart components.
   */
  localeText: PropTypes.object,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   *
   * Accepts a `number` to be used on all sides or an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   */
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  })]),
  /**
   * Callback fired when an area is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onAreaClick: PropTypes.func,
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | ChartsAxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: PropTypes.func,
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: PropTypes.func,
  /**
   * Callback fired when a mark is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onMarkClick: PropTypes.func,
  /**
   * The configuration of the radar scales.
   */
  radar: PropTypes.shape({
    labelFormatter: PropTypes.func,
    labelGap: PropTypes.number,
    max: PropTypes.number,
    metrics: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({
      max: PropTypes.number,
      min: PropTypes.number,
      name: PropTypes.string.isRequired
    }))]).isRequired,
    startAngle: PropTypes.number
  }).isRequired,
  /**
   * The series to display in the bar chart.
   * An array of [[RadarSeries]] objects.
   */
  series: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The grid shape.
   * @default 'sharp'
   */
  shape: PropTypes.oneOf(['circular', 'sharp']),
  /**
   * If true, shows the default chart toolbar.
   * @default false
   */
  showToolbar: PropTypes.bool,
  /**
   * If `true`, animations are skipped.
   * If unset or `false`, the animations respects the user's `prefers-reduced-motion` setting.
   */
  skipAnimation: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object,
  /**
   * Get stripe fill color. Set it to `null` to remove stripes
   * @param {number} index The index of the stripe band.
   * @returns {string} The color to fill the stripe.
   * @default (index) => index % 2 === 1 ? (theme.vars || theme).palette.text.secondary : 'none'
   */
  stripeColor: PropTypes.func,
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  theme: PropTypes.oneOf(['dark', 'light']),
  title: PropTypes.string,
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: PropTypes.number
} : void 0;
export { RadarChart };