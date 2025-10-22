'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["slots", "slotProps", "onItemClick", "skipAnimation"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { AreaElement, areaElementClasses } from "./AreaElement.js";
import { useSkipAnimation } from "../hooks/useSkipAnimation.js";
import { useXAxes, useYAxes } from "../hooks/useAxis.js";
import { useInternalIsZoomInteracting } from "../internals/plugins/featurePlugins/useChartCartesianAxis/useInternalIsZoomInteracting.js";
import { useAreaPlotData } from "./useAreaPlotData.js";
import { jsx as _jsx } from "react/jsx-runtime";
const AreaPlotRoot = styled('g', {
  name: 'MuiAreaPlot',
  slot: 'Root'
})({
  [`& .${areaElementClasses.root}`]: {
    transition: 'opacity 0.2s ease-in, fill 0.2s ease-in'
  }
});
const useAggregatedData = () => {
  const {
    xAxis: xAxes
  } = useXAxes();
  const {
    yAxis: yAxes
  } = useYAxes();
  return useAreaPlotData(xAxes, yAxes);
};

/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Areas demonstration](https://mui.com/x/react-charts/areas-demo/)
 * - [Stacking](https://mui.com/x/react-charts/stacking/)
 *
 * API:
 *
 * - [AreaPlot API](https://mui.com/x/api/charts/area-plot/)
 */
function AreaPlot(props) {
  const {
      slots,
      slotProps,
      onItemClick,
      skipAnimation: inSkipAnimation
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const isZoomInteracting = useInternalIsZoomInteracting();
  const skipAnimation = useSkipAnimation(isZoomInteracting || inSkipAnimation);
  const completedData = useAggregatedData();
  return /*#__PURE__*/_jsx(AreaPlotRoot, _extends({}, other, {
    children: completedData.map(({
      d,
      seriesId,
      color,
      area,
      gradientId
    }) => !!area && /*#__PURE__*/_jsx(AreaElement, {
      id: seriesId,
      d: d,
      color: color,
      gradientId: gradientId,
      slots: slots,
      slotProps: slotProps,
      onClick: onItemClick && (event => onItemClick(event, {
        type: 'line',
        seriesId
      })),
      skipAnimation: skipAnimation
    }, seriesId))
  }));
}
process.env.NODE_ENV !== "production" ? AreaPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line area item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
   */
  onItemClick: PropTypes.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object
} : void 0;
export { AreaPlot };