'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["render", "onKeyDown", "onFocus", "disabled", "aria-disabled"],
  _excluded2 = ["tabIndex"];
import PropTypes from 'prop-types';
import * as React from 'react';
import { useComponentRenderer } from '@mui/x-internals/useComponentRenderer';
import useForkRef from '@mui/utils/useForkRef';
import { useRegisterToolbarButton } from '@mui/x-internals/ToolbarContext';
import { useChartsSlots } from "../context/ChartsSlotsContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ToolbarButton = /*#__PURE__*/React.forwardRef(function ToolbarButton(props, ref) {
  const {
      render
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    slots,
    slotProps
  } = useChartsSlots();
  const buttonRef = React.useRef(null);
  const handleRef = useForkRef(buttonRef, ref);
  const _useRegisterToolbarBu = useRegisterToolbarButton(props, buttonRef),
    {
      tabIndex
    } = _useRegisterToolbarBu,
    toolbarButtonProps = _objectWithoutPropertiesLoose(_useRegisterToolbarBu, _excluded2);
  const element = useComponentRenderer(slots.baseIconButton, render, _extends({}, slotProps?.baseIconButton, {
    tabIndex
  }, other, toolbarButtonProps, {
    ref: handleRef
  }));
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: element
  });
});
if (process.env.NODE_ENV !== "production") ToolbarButton.displayName = "ToolbarButton";
process.env.NODE_ENV !== "production" ? ToolbarButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  /**
   * A function to customize the rendering of the component.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  style: PropTypes.object,
  tabIndex: PropTypes.number
} : void 0;
export { ToolbarButton };