import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRadarSeriesData } from "./useRadarSeriesData.js";
import { useInteractionAllItemProps } from "../../hooks/useInteractionItemProps.js";
import { useItemHighlightedGetter } from "../../hooks/useItemHighlightedGetter.js";
import { useUtilityClasses } from "./radarSeriesPlotClasses.js";
import { getPathProps } from "./RadarSeriesArea.js";
import { getCircleProps } from "./RadarSeriesMarks.js";
import { useRadarRotationIndex } from "./useRadarRotationIndex.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function RadarSeriesPlot(props) {
  const {
    seriesId: inSeriesId,
    classes: inClasses,
    onAreaClick,
    onMarkClick
  } = props;
  const seriesCoordinates = useRadarSeriesData(inSeriesId);
  const getRotationIndex = useRadarRotationIndex();
  const interactionProps = useInteractionAllItemProps(seriesCoordinates);
  const {
    isFaded,
    isHighlighted
  } = useItemHighlightedGetter();
  const classes = useUtilityClasses(inClasses);
  return /*#__PURE__*/_jsx("g", {
    className: classes.root,
    children: seriesCoordinates?.map(({
      seriesId,
      points,
      color,
      hideMark,
      fillArea
    }, seriesIndex) => {
      return /*#__PURE__*/_jsxs("g", {
        children: [/*#__PURE__*/_jsx("path", _extends({}, getPathProps({
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
        }, interactionProps[seriesIndex]), seriesId), !hideMark && points.map((point, index) => /*#__PURE__*/_jsx("circle", _extends({}, getCircleProps({
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
  classes: PropTypes.object,
  /**
   * Callback fired when an area is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onAreaClick: PropTypes.func,
  /**
   * Callback fired when a mark is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onMarkClick: PropTypes.func,
  /**
   * The id of the series to display.
   * If undefined all series are displayed.
   */
  seriesId: PropTypes.string
} : void 0;
export { RadarSeriesPlot };