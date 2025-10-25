'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const ChartsSlotsContext = /*#__PURE__*/React.createContext(null);

/**
 * Get the slots and slotProps from the nearest `ChartDataProvider` or `ChartDataProviderPro`.
 * @returns {ChartsSlotsContextValue} The slots and slotProps from the context.
 */
if (process.env.NODE_ENV !== "production") ChartsSlotsContext.displayName = "ChartsSlotsContext";
export function useChartsSlots() {
  const context = React.useContext(ChartsSlotsContext);
  if (context == null) {
    throw new Error(['MUI X Charts: Could not find the Charts Slots context.', 'It looks like you rendered your component outside of a ChartDataProvider.', 'This can also happen if you are bundling multiple versions of the library.'].join('\n'));
  }
  return context;
}
export function ChartsSlotsProvider(props) {
  const {
    slots,
    slotProps = {},
    defaultSlots,
    children
  } = props;
  const value = React.useMemo(() => ({
    slots: _extends({}, defaultSlots, slots),
    slotProps
  }), [defaultSlots, slots, slotProps]);
  return /*#__PURE__*/_jsx(ChartsSlotsContext.Provider, {
    value: value,
    children: children
  });
}