import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["bars", "skipAnimation"];
import * as React from 'react';
import { BarLabelItem } from "./BarLabelItem.js";
import { useUtilityClasses } from "../barClasses.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @ignore - internal component.
 */
function BarLabelPlot(props) {
  const {
      bars,
      skipAnimation
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const classes = useUtilityClasses();
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: bars.flatMap(({
      seriesId,
      data
    }) => /*#__PURE__*/_jsx("g", {
      className: classes.seriesLabels,
      "data-series": seriesId,
      children: data.map(({
        xOrigin,
        yOrigin,
        x,
        y,
        dataIndex,
        color,
        value,
        width,
        height,
        layout
      }) => /*#__PURE__*/_jsx(BarLabelItem, _extends({
        seriesId: seriesId,
        dataIndex: dataIndex,
        value: value,
        color: color,
        xOrigin: xOrigin,
        yOrigin: yOrigin,
        x: x,
        y: y,
        width: width,
        height: height,
        skipAnimation: skipAnimation ?? false,
        layout: layout ?? 'vertical'
      }, other), dataIndex))
    }, seriesId))
  });
}
export { BarLabelPlot };