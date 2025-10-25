'use client';

import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useChartContext } from "../context/ChartProvider/index.js";
import { useSvgRef } from "../hooks/index.js";
/**
 * @deprecated We recommend using vanilla JS to let popper track mouse position.
 */
export function useMouseTracker() {
  const {
    instance
  } = useChartContext();

  // Use a ref to avoid rerendering on every mousemove event.
  const [mousePosition, setMousePosition] = React.useState(null);
  React.useEffect(() => {
    const moveEndHandler = instance.addInteractionListener('moveEnd', event => {
      if (!event.detail.activeGestures.pan) {
        setMousePosition(null);
      }
    });
    const gestureHandler = event => {
      setMousePosition({
        x: event.detail.centroid.x,
        y: event.detail.centroid.y,
        height: event.detail.srcEvent.height,
        pointerType: event.detail.srcEvent.pointerType
      });
    };
    const moveHandler = instance.addInteractionListener('move', gestureHandler);
    const panHandler = instance.addInteractionListener('pan', gestureHandler);
    return () => {
      moveHandler.cleanup();
      panHandler.cleanup();
      moveEndHandler.cleanup();
    };
  }, [instance]);
  return mousePosition;
}
export function usePointerType() {
  const svgRef = useSvgRef();
  const [pointerType, setPointerType] = React.useState(null);
  React.useEffect(() => {
    const element = svgRef.current;
    if (element === null) {
      return () => {};
    }
    const handleOut = event => {
      if (event.pointerType !== 'mouse') {
        setPointerType(null);
      }
    };
    const handleEnter = event => {
      setPointerType({
        pointerType: event.pointerType
      });
    };
    element.addEventListener('pointerenter', handleEnter);
    element.addEventListener('pointerup', handleOut);
    return () => {
      element.removeEventListener('pointerenter', handleEnter);
      element.removeEventListener('pointerup', handleOut);
    };
  }, [svgRef]);
  return pointerType;
}
export function utcFormatter(v) {
  if (v instanceof Date) {
    return v.toUTCString();
  }
  return v.toLocaleString();
}

// Taken from @mui/x-date-time-pickers
const mainPointerFineMediaQuery = '@media (pointer: fine)';

/**
 * Returns true if the main pointer is fine (e.g. mouse).
 * This is useful for determining how to position tooltips or other UI elements based on the type of input device.
 * @returns true if the main pointer is fine, false otherwise.
 */
export const useIsFineMainPointer = () => {
  return useMediaQuery(mainPointerFineMediaQuery, {
    defaultMatches: true
  });
};