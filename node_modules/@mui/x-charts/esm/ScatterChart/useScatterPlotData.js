import * as React from 'react';
import { getValueToPositionMapper } from "../hooks/index.js";
export function useScatterPlotData(series, xScale, yScale, isPointInside) {
  return React.useMemo(() => {
    const getXPosition = getValueToPositionMapper(xScale);
    const getYPosition = getValueToPositionMapper(yScale);
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