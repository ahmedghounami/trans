'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import { warnOnce } from '@mui/x-internals/warning';
import { useDrawingArea, useXScale } from "../hooks/index.js";
import { ReferenceLineRoot } from "./common.js";
import { ChartsText } from "../ChartsText/index.js";
import { getReferenceLineUtilityClass } from "./chartsReferenceLineClasses.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const getTextParams = ({
  top,
  height,
  spacingY,
  labelAlign = 'middle'
}) => {
  switch (labelAlign) {
    case 'start':
      return {
        y: top + spacingY,
        style: {
          dominantBaseline: 'hanging',
          textAnchor: 'start'
        }
      };
    case 'end':
      return {
        y: top + height - spacingY,
        style: {
          dominantBaseline: 'auto',
          textAnchor: 'start'
        }
      };
    default:
      return {
        y: top + height / 2,
        style: {
          dominantBaseline: 'central',
          textAnchor: 'start'
        }
      };
  }
};
export function getXReferenceLineClasses(classes) {
  return composeClasses({
    root: ['root', 'vertical'],
    line: ['line'],
    label: ['label']
  }, getReferenceLineUtilityClass, classes);
}
function ChartsXReferenceLine(props) {
  const {
    x,
    label = '',
    spacing = 5,
    classes: inClasses,
    labelAlign,
    lineStyle,
    labelStyle,
    axisId
  } = props;
  const {
    top,
    height
  } = useDrawingArea();
  const xAxisScale = useXScale(axisId);
  const xPosition = xAxisScale(x);
  if (xPosition === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      warnOnce(`MUI X Charts: the value ${x} does not exist in the data of x axis with id ${axisId}.`, 'error');
    }
    return null;
  }
  const d = `M ${xPosition} ${top} l 0 ${height}`;
  const classes = getXReferenceLineClasses(inClasses);
  const spacingX = typeof spacing === 'object' ? spacing.x ?? 0 : spacing;
  const spacingY = typeof spacing === 'object' ? spacing.y ?? 0 : spacing;
  const textParams = _extends({
    x: xPosition + spacingX,
    text: label,
    fontSize: 12
  }, getTextParams({
    top,
    height,
    spacingY,
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
process.env.NODE_ENV !== "production" ? ChartsXReferenceLine.propTypes = {
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
   * The x value associated with the reference line.
   * If defined the reference line will be vertical.
   */
  x: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]).isRequired
} : void 0;
export { ChartsXReferenceLine };