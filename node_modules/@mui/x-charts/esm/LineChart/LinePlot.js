'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["slots", "slotProps", "skipAnimation", "onItemClick"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { LineElement, lineElementClasses } from "./LineElement.js";
import { useSkipAnimation } from "../hooks/useSkipAnimation.js";
import { useXAxes, useYAxes } from "../hooks/index.js";
import { useInternalIsZoomInteracting } from "../internals/plugins/featurePlugins/useChartCartesianAxis/useInternalIsZoomInteracting.js";
import { useLinePlotData } from "./useLinePlotData.js";
import { jsx as _jsx } from "react/jsx-runtime";
const LinePlotRoot = styled('g', {
  name: 'MuiAreaPlot',
  slot: 'Root'
})({
  [`& .${lineElementClasses.root}`]: {
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
  return useLinePlotData(xAxes, yAxes);
};

/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Line demonstration](https://mui.com/x/react-charts/line-demo/)
 *
 * API:
 *
 * - [LinePlot API](https://mui.com/x/api/charts/line-plot/)
 */
function LinePlot(props) {
  const {
      slots,
      slotProps,
      skipAnimation: inSkipAnimation,
      onItemClick
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const isZoomInteracting = useInternalIsZoomInteracting();
  const skipAnimation = useSkipAnimation(isZoomInteracting || inSkipAnimation);
  const completedData = useAggregatedData();
  return /*#__PURE__*/_jsx(LinePlotRoot, _extends({}, other, {
    children: completedData.map(({
      d,
      seriesId,
      color,
      gradientId
    }) => {
      return /*#__PURE__*/_jsx(LineElement, {
        id: seriesId,
        d: d,
        color: color,
        gradientId: gradientId,
        skipAnimation: skipAnimation,
        slots: slots,
        slotProps: slotProps,
        onClick: onItemClick && (event => onItemClick(event, {
          type: 'line',
          seriesId
        }))
      }, seriesId);
    })
  }));
}
process.env.NODE_ENV !== "production" ? LinePlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line item is clicked.
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
export { LinePlot };