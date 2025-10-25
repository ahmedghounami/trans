"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadarSeriesPlot = RadarSeriesPlot;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useRadarSeriesData = require("./useRadarSeriesData");
var _useInteractionItemProps = require("../../hooks/useInteractionItemProps");
var _useItemHighlightedGetter = require("../../hooks/useItemHighlightedGetter");
var _radarSeriesPlotClasses = require("./radarSeriesPlotClasses");
var _RadarSeriesArea = require("./RadarSeriesArea");
var _RadarSeriesMarks = require("./RadarSeriesMarks");
var _useRadarRotationIndex = require("./useRadarRotationIndex");
var _jsxRuntime = require("react/jsx-runtime");
function RadarSeriesPlot(props) {
  const {
    seriesId: inSeriesId,
    classes: inClasses,
    onAreaClick,
    onMarkClick
  } = props;
  const seriesCoordinates = (0, _useRadarSeriesData.useRadarSeriesData)(inSeriesId);
  const getRotationIndex = (0, _useRadarRotationIndex.useRadarRotationIndex)();
  const interactionProps = (0, _useInteractionItemProps.useInteractionAllItemProps)(seriesCoordinates);
  const {
    isFaded,
    isHighlighted
  } = (0, _useItemHighlightedGetter.useItemHighlightedGetter)();
  const classes = (0, _radarSeriesPlotClasses.useUtilityClasses)(inClasses);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: classes.root,
    children: seriesCoordinates?.map(({
      seriesId,
      points,
      color,
      hideMark,
      fillArea
    }, seriesIndex) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2.default)({}, (0, _RadarSeriesArea.getPathProps)({
          seriesId,
          points,
          color,
          fillArea,
          isFaded,
          isHighlighted,
          classes
        }), {
          onClick: event => onAreaClick?.(event, {
            type: 'radar',
            seriesId,
            dataIndex: getRotationIndex(event)
          }),
          cursor: onAreaClick ? 'pointer' : 'unset'
        }, interactionProps[seriesIndex]), seriesId), !hideMark && points.map((point, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", (0, _extends2.default)({}, (0, _RadarSeriesMarks.getCircleProps)({
          seriesId,
          point,
          color,
          fillArea,
          isFaded,
          isHighlighted,
          classes
        }), {
          onClick: event => onMarkClick?.(event, {
            type: 'radar',
            seriesId,
            dataIndex: index
          }),
          cursor: onMarkClick ? 'pointer' : 'unset'
        }), index))]
      }, seriesId);
    })
  });
}
process.env.NODE_ENV !== "production" ? RadarSeriesPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * Callback fired when an area is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onAreaClick: _propTypes.default.func,
  /**
   * Callback fired when a mark is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onMarkClick: _propTypes.default.func,
  /**
   * The id of the series to display.
   * If undefined all series are displayed.
   */
  seriesId: _propTypes.default.string
} : void 0;