'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "localeText", "plugins", "seriesConfig", "slots", "slotProps"];
import { useTheme, useThemeProps } from '@mui/material/styles';
import { DEFAULT_PLUGINS } from "../internals/plugins/allPlugins.js";
export const useChartDataProviderProps = inProps => {
  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const props = useThemeProps({
    props: inProps,
    name: 'MuiChartDataProvider'
  });
  const {
      children,
      localeText,
      plugins = DEFAULT_PLUGINS,
      seriesConfig,
      slots,
      slotProps
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const theme = useTheme();
  const chartProviderProps = {
    plugins: plugins,
    seriesConfig,
    pluginParams: _extends({
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