"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScatterPlotData = useScatterPlotData;
var React = _interopRequireWildcard(require("react"));
var _hooks = require("../hooks");
function useScatterPlotData(series, xScale, yScale, isPointInside) {
  return React.useMemo(() => {
    const getXPosition = (0, _hooks.getValueToPositionMapper)(xScale);
    const getYPosition = (0, _hooks.getValueToPositionMapper)(yScale);
    const temp = [];
    for (let i = 0; i < series.data.length; i += 1) {
      const scatterPoint = series.data[i];
      const x = getXPosition(scatterPoint.x);
      const y = getYPosition(scatterPoint.y);
      const isInRange = isPointInside(x, y);
      if (isInRange) {
        temp.push({
          x,
          y,
          id: scatterPoint.id,
          seriesId: series.id,
          type: 'scatter',
          dataIndex: i
        });
      }
    }
    return temp;
  }, [xScale, yScale, series.data, series.id, isPointInside]);
}