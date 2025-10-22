"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _useComponentRenderer = require("@mui/x-internals/useComponentRenderer");
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _ToolbarContext = require("@mui/x-internals/ToolbarContext");
var _ChartsSlotsContext = require("../context/ChartsSlotsContext");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["render", "onKeyDown", "onFocus", "disabled", "aria-disabled"],
  _excluded2 = ["tabIndex"];
const ToolbarButton = exports.ToolbarButton = /*#__PURE__*/React.forwardRef(function ToolbarButton(props, ref) {
  const {
      render
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    slots,
    slotProps
  } = (0, _ChartsSlotsContext.useChartsSlots)();
  const buttonRef = React.useRef(null);
  const handleRef = (0, _useForkRef.default)(buttonRef, ref);
  const _useRegisterToolbarBu = (0, _ToolbarContext.useRegisterToolbarButton)(props, buttonRef),
    {
      tabIndex
    } = _useRegisterToolbarBu,
    toolbarButtonProps = (0, _objectWithoutPropertiesLoose2.default)(_useRegisterToolbarBu, _excluded2);
  const element = (0, _useComponentRenderer.useComponentRenderer)(slots.baseIconButton, render, (0, _extends2.default)({}, slotProps?.baseIconButton, {
    tabIndex
  }, other, toolbarButtonProps, {
    ref: handleRef
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ToolbarButton.displayName = "ToolbarButton";
process.env.NODE_ENV !== "production" ? ToolbarButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  id: _propTypes.default.string,
  /**
   * A function to customize the rendering of the component.
   */
  render: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  size: _propTypes.default.oneOf(['large', 'medium', 'small']),
  style: _propTypes.default.object,
  tabIndex: _propTypes.default.number
} : void 0;