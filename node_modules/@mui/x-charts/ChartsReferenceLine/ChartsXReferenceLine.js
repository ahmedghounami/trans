"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsXReferenceLine = ChartsXReferenceLine;
exports.getXReferenceLineClasses = getXReferenceLineClasses;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _warning = require("@mui/x-internals/warning");
var _hooks = require("../hooks");
var _common = require("./common");
var _ChartsText = require("../ChartsText");
var _chartsReferenceLineClasses = require("./chartsReferenceLineClasses");
var _jsxRuntime = require("react/jsx-runtime");
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
function getXReferenceLineClasses(classes) {
  return (0, _composeClasses.default)({
    root: ['root', 'vertical'],
    line: ['line'],
    label: ['label']
  }, _chartsReferenceLineClasses.getReferenceLineUtilityClass, classes);
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
  } = (0, _hooks.useDrawingArea)();
  const xAxisScale = (0, _hooks.useXScale)(axisId);
  const xPosition = xAxisScale(x);
  if (xPosition === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      (0, _warning.warnOnce)(`MUI X Charts: the value ${x} does not exist in the data of x axis with id ${axisId}.`, 'error');
    }
    return null;
  }
  const d = `M ${xPosition} ${top} l 0 ${height}`;
  const classes = getXReferenceLineClasses(inClasses);
  const spacingX = typeof spacing === 'object' ? spacing.x ?? 0 : spacing;
  const spacingY = typeof spacing === 'object' ? spacing.y ?? 0 : spacing;
  const textParams = (0, _extends2.default)({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_common.ReferenceLineRoot, {
    className: classes.root,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: d,
      className: classes.line,
      style: lineStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsText.ChartsText, (0, _extends2.default)({}, textParams, {
      style: (0, _extends2.default)({}, textParams.style, labelStyle)
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
  axisId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * The label to display along the reference line.
   */
  label: _propTypes.default.string,
  /**
   * The alignment if the label is in the chart drawing area.
   * @default 'middle'
   */
  labelAlign: _propTypes.default.oneOf(['end', 'middle', 'start']),
  /**
   * The style applied to the label.
   */
  labelStyle: _propTypes.default.object,
  /**
   * The style applied to the line.
   */
  lineStyle: _propTypes.default.object,
  /**
   * Additional space around the label in px.
   * Can be a number or an object `{ x, y }` to distinguish space with the reference line and space with axes.
   * @default 5
   */
  spacing: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  })]),
  /**
   * The x value associated with the reference line.
   * If defined the reference line will be vertical.
   */
  x: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.number, _propTypes.default.string]).isRequired
} : void 0;