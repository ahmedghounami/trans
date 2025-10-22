"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsSlotsContext = void 0;
exports.ChartsSlotsProvider = ChartsSlotsProvider;
exports.useChartsSlots = useChartsSlots;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
const ChartsSlotsContext = exports.ChartsSlotsContext = /*#__PURE__*/React.createContext(null);

/**
 * Get the slots and slotProps from the nearest `ChartDataProvider` or `ChartDataProviderPro`.
 * @returns {ChartsSlotsContextValue} The slots and slotProps from the context.
 */
if (process.env.NODE_ENV !== "production") ChartsSlotsContext.displayName = "ChartsSlotsContext";
function useChartsSlots() {
  const context = React.useContext(ChartsSlotsContext);
  if (context == null) {
    throw new Error(['MUI X Charts: Could not find the Charts Slots context.', 'It looks like you rendered your component outside of a ChartDataProvider.', 'This can also happen if you are bundling multiple versions of the library.'].join('\n'));
  }
  return context;
}
function ChartsSlotsProvider(props) {
  const {
    slots,
    slotProps = {},
    defaultSlots,
    children
  } = props;
  const value = React.useMemo(() => ({
    slots: (0, _extends2.default)({}, defaultSlots, slots),
    slotProps
  }), [defaultSlots, slots, slotProps]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartsSlotsContext.Provider, {
    value: value,
    children: children
  });
}