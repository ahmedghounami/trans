'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["skipAnimation", "onItemClick", "borderRadius", "barLabel"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { barElementClasses } from "./barElementClasses.js";
import { BarElement } from "./BarElement.js";
import { useDrawingArea, useXAxes, useYAxes } from "../hooks/index.js";
import { BarClipPath } from "./BarClipPath.js";
import { BarLabelPlot } from "./BarLabel/BarLabelPlot.js";
import { useSkipAnimation } from "../hooks/useSkipAnimation.js";
import { useInternalIsZoomInteracting } from "../internals/plugins/featurePlugins/useChartCartesianAxis/useInternalIsZoomInteracting.js";
import { useBarPlotData } from "./useBarPlotData.js";
import { useUtilityClasses } from "./barClasses.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BarPlotRoot = styled('g', {
  name: 'MuiBarPlot',
  slot: 'Root'
})({
  [`& .${barElementClasses.root}`]: {
    transition: 'opacity 0.2s ease-in, fill 0.2s ease-in'
  }
});

/**
 * Demos:
 *
 * - [Bars](https://mui.com/x/react-charts/bars/)
 * - [Bar demonstration](https://mui.com/x/react-charts/bar-demo/)
 * - [Stacking](https://mui.com/x/react-charts/stacking/)
 *
 * API:
 *
 * - [BarPlot API](https://mui.com/x/api/charts/bar-plot/)
 */
function BarPlot(props) {
  const {
      skipAnimation: inSkipAnimation,
      onItemClick,
      borderRadius,
      barLabel
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const isZoomInteracting = useInternalIsZoomInteracting();
  const skipAnimation = useSkipAnimation(isZoomInteracting || inSkipAnimation);
  const {
    xAxis: xAxes
  } = useXAxes();
  const {
    yAxis: yAxes
  } = useYAxes();
  const {
    completedData,
    masksData
  } = useBarPlotData(useDrawingArea(), xAxes, yAxes);
  const withoutBorderRadius = !borderRadius || borderRadius <= 0;
  const classes = useUtilityClasses();
  return /*#__PURE__*/_jsxs(BarPlotRoot, {
    className: classes.root,
    children: [!withoutBorderRadius && masksData.map(({
      id,
      x,
      y,
      xOrigin,
      yOrigin,
      width,
      height,
      hasPositive,
      hasNegative,
      layout
    }) => {
      return /*#__PURE__*/_jsx(BarClipPath, {
        maskId: id,
        borderRadius: borderRadius,
        hasNegative: hasNegative,
        hasPositive: hasPositive,
        layout: layout,
        x: x,
        y: y,
        xOrigin: xOrigin,
        yOrigin: yOrigin,
        width: width,
        height: height,
        skipAnimation: skipAnimation ?? false
      }, id);
    }), completedData.map(({
      seriesId,
      data
    }) => {
      return /*#__PURE__*/_jsx("g", {
        "data-series": seriesId,
        className: classes.series,
        children: data.map(({
          dataIndex,
          color,
          maskId,
          layout,
          x,
          xOrigin,
          y,
          yOrigin,
          width,
          height
        }) => {
          const barElement = /*#__PURE__*/_jsx(BarElement, _extends({
            id: seriesId,
            dataIndex: dataIndex,
            color: color,
            skipAnimation: skipAnimation ?? false,
            layout: layout ?? 'vertical',
            x: x,
            xOrigin: xOrigin,
            y: y,
            yOrigin: yOrigin,
            width: width,
            height: height
          }, other, {
            onClick: onItemClick && (event => {
              onItemClick(event, {
                type: 'bar',
                seriesId,
                dataIndex
              });
            })
          }), dataIndex);
          if (withoutBorderRadius) {
            return barElement;
          }
          return /*#__PURE__*/_jsx("g", {
            clipPath: `url(#${maskId})`,
            children: barElement
          }, dataIndex);
        })
      }, seriesId);
    }), barLabel && /*#__PURE__*/_jsx(BarLabelPlot, _extends({
      bars: completedData,
      skipAnimation: skipAnimation,
      barLabel: barLabel
    }, other))]
  });
}
process.env.NODE_ENV !== "production" ? BarPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If provided, the function will be used to format the label of the bar.
   * It can be set to 'value' to display the current value.
   * @param {BarItem} item The item to format.
   * @param {BarLabelContext} context data about the bar.
   * @returns {string} The formatted label.
   */
  barLabel: PropTypes.oneOfType([PropTypes.oneOf(['value']), PropTypes.func]),
  /**
   * Defines the border radius of the bar element.
   */
  borderRadius: PropTypes.number,
  /**
   * Callback fired when a bar item is clicked.
   * @param {React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
   * @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
   */
  onItemClick: PropTypes.func,
  /**
   * If `true`, animations are skipped.
   * @default undefined
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
export { BarPlot };