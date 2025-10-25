import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "render"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useComponentRenderer } from '@mui/x-internals/useComponentRenderer';
import { ToolbarContextProvider } from '@mui/x-internals/ToolbarContext';
import { chartsToolbarClasses } from "./chartToolbarClasses.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ToolbarRoot = styled('div', {
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
export const Toolbar = /*#__PURE__*/React.forwardRef(function Toolbar(_ref, ref) {
  let {
      className,
      render
    } = _ref,
    other = _objectWithoutPropertiesLoose(_ref, _excluded);
  const element = useComponentRenderer(ToolbarRoot, render, _extends({
    role: 'toolbar',
    'aria-orientation': 'horizontal',
    className: clsx(chartsToolbarClasses.root, className)
  }, other, {
    ref
  }));
  return /*#__PURE__*/_jsx(ToolbarContextProvider, {
    children: element
  });
});
if (process.env.NODE_ENV !== "production") Toolbar.displayName = "Toolbar";
process.env.NODE_ENV !== "production" ? Toolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  className: PropTypes.string,
  /**
   * A function to customize rendering of the component.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
} : void 0;