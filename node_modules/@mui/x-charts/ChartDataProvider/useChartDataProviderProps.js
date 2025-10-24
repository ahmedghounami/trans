"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChartDataProviderProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _styles = require("@mui/material/styles");
var _allPlugins = require("../internals/plugins/allPlugins");
const _excluded = ["children", "localeText", "plugins", "seriesConfig", "slots", "slotProps"];
const useChartDataProviderProps = inProps => {
  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiChartDataProvider'
  });
  const {
      children,
      localeText,
      plugins = _allPlugins.DEFAULT_PLUGINS,
      seriesConfig,
      slots,
      slotProps
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const theme = (0, _styles.useTheme)();
  const chartProviderProps = {
    plugins: plugins,
    seriesConfig,
    pluginParams: (0, _extends2.default)({
      theme: theme.palette.mode
    }, other)
  };
  return {
    children,
    localeText,
    chartProviderProps,
    slots,
    slotProps
  };
};
exports.useChartDataProviderProps = useChartDataProviderProps;