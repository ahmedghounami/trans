"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsYReferenceLine = ChartsYReferenceLine;
exports.getYReferenceLineClasses = getYReferenceLineClasses;
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
function getYReferenceLineClasses(classes) {
  return (0, _composeClasses.default)({
    root: ['root', 'horizontal'],
    line: ['line'],
    label: ['label']
  }, _chartsReferenceLineClasses.getReferenceLineUtilityClass, classes);
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
  } = (0, _hooks.useDrawingArea)();
  const yAxisScale = (0, _hooks.useYScale)(axisId);
  const yPosition = yAxisScale(y);
  if (yPosition === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      (0, _warning.warnOnce)(`MUI X Charts: the value ${y} does not exist in the data of y axis with id ${axisId}.`, 'error');
    }
    return null;
  }
  const d = `M ${left} ${yPosition} l ${width} 0`;
  const classes = getYReferenceLineClasses(inClasses);
  const spacingX = typeof spacing === 'object' ? spacing.x ?? 0 : spacing;
  const spacingY = typeof spacing === 'object' ? spacing.y ?? 0 : spacing;
  const textParams = (0, _extends2.default)({
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
process.env.NODE_ENV !== "production" ? ChartsYReferenceLine.propTypes = {
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
   * The y value associated with the reference line.
   * If defined the reference line will be horizontal.
   */
  y: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.number, _propTypes.default.string]).isRequired
} : void 0;