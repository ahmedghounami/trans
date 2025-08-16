"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _clsx = _interopRequireDefault(require("clsx"));
var _useComponentRenderer = require("@mui/x-internals/useComponentRenderer");
var _ToolbarContext = require("@mui/x-internals/ToolbarContext");
var _chartToolbarClasses = require("./chartToolbarClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "render"];
const ToolbarRoot = (0, _styles.styled)('div', {
  name: 'MuiChartsToolbar',
  slot: 'Root'
})(({
  theme
}) => ({
  flex: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: theme.spacing(0.25),
  padding: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  minHeight: 44,
  boxSizing: 'border-box',
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderRadius: 4
}));
const Toolbar = exports.Toolbar = /*#__PURE__*/React.forwardRef(function Toolbar(_ref, ref) {
  let {
      className,
      render
    } = _ref,
    other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const element = (0, _useComponentRenderer.useComponentRenderer)(ToolbarRoot, render, (0, _extends2.default)({
    role: 'toolbar',
    'aria-orientation': 'horizontal',
    className: (0, _clsx.default)(_chartToolbarClasses.chartsToolbarClasses.root, className)
  }, other, {
    ref
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarContext.ToolbarContextProvider, {
    children: element
  });
});
if (process.env.NODE_ENV !== "production") Toolbar.displayName = "Toolbar";
process.env.NODE_ENV !== "production" ? Toolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  className: _propTypes.default.string,
  /**
   * A function to customize rendering of the component.
   */
  render: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func])
} : void 0;