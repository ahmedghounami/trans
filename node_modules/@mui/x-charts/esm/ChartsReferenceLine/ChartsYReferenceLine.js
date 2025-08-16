'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import { warnOnce } from '@mui/x-internals/warning';
import { useDrawingArea, useYScale } from "../hooks/index.js";
import { ReferenceLineRoot } from "./common.js";
import { ChartsText } from "../ChartsText/index.js";
import { getReferenceLineUtilityClass } from "./chartsReferenceLineClasses.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const getTextParams = ({
  left,
  width,
  spacingX,
  labelAlign = 'middle'
}) => {
  switch (labelAlign) {
    case 'start':
      return {
        x: left + spacingX,
        style: {
          dominantBaseline: 'auto',
          textAnchor: 'start'
        }
      };
    case 'end':
      return {
        x: left + width - spacingX,
        style: {
          dominantBaseline: 'auto',
          textAnchor: 'end'
        }
      };
    default:
      return {
        x: left + width / 2,
        style: {
          dominantBaseline: 'auto',
          textAnchor: 'middle'
        }
      };
  }
};
export function getYReferenceLineClasses(classes) {
  return composeClasses({
    root: ['root', 'horizontal'],
    line: ['line'],
    label: ['label']
  }, getReferenceLineUtilityClass, classes);
}
function ChartsYReferenceLine(props) {
  const {
    y,
    label = '',
    spacing = 5,
    classes: inClasses,
    labelAlign,
    lineStyle,
    labelStyle,
    axisId
  } = props;
  const {
    left,
    width
  } = useDrawingArea();
  const yAxisScale = useYScale(axisId);
  const yPosition = yAxisScale(y);
  if (yPosition === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      warnOnce(`MUI X Charts: the value ${y} does not exist in the data of y axis with id ${axisId}.`, 'error');
    }
    return null;
  }
  const d = `M ${left} ${yPosition} l ${width} 0`;
  const classes = getYReferenceLineClasses(inClasses);
  const spacingX = typeof spacing === 'object' ? spacing.x ?? 0 : spacing;
  const spacingY = typeof spacing === 'object' ? spacing.y ?? 0 : spacing;
  const textParams = _extends({
    y: yPosition - spacingY,
    text: label,
    fontSize: 12
  }, getTextParams({
    left,
    width,
    spacingX,
    labelAlign
  }), {
    className: classes.label
  });
  return /*#__PURE__*/_jsxs(ReferenceLineRoot, {
    className: classes.root,
    children: [/*#__PURE__*/_jsx("path", {
      d: d,
      className: classes.line,
      style: lineStyle
    }), /*#__PURE__*/_jsx(ChartsText, _extends({}, textParams, {
      style: _extends({}, textParams.style, labelStyle)
    }))]
  });
}
process.env.NODE_ENV !== "production" ? ChartsYReferenceLine.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The id of the axis used for the reference value.
   * @default The `id` of the first defined axis.
   */
  axisId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The label to display along the reference line.
   */
  label: PropTypes.string,
  /**
   * The alignment if the label is in the chart drawing area.
   * @default 'middle'
   */
  labelAlign: PropTypes.oneOf(['end', 'middle', 'start']),
  /**
   * The style applied to the label.
   */
  labelStyle: PropTypes.object,
  /**
   * The style applied to the line.
   */
  lineStyle: PropTypes.object,
  /**
   * Additional space around the label in px.
   * Can be a number or an object `{ x, y }` to distinguish space with the reference line and space with axes.
   * @default 5
   */
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })]),
  /**
   * The y value associated with the reference line.
   * If defined the reference line will be horizontal.
   */
  y: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]).isRequired
} : void 0;
export { ChartsYReferenceLine };