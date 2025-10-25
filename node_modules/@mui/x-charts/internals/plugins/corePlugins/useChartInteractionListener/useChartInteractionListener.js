"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChartInteractionListener = void 0;
var React = _interopRequireWildcard(require("react"));
var _core = require("@mui/x-internal-gestures/core");
const preventDefault = event => event.preventDefault();
const useChartInteractionListener = ({
  svgRef
}) => {
  React.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return undefined;
    }
    const gestureManager = new _core.GestureManager({
      gestures: [new _core.PanGesture({
        name: 'pan',
        threshold: 0,
        maxPointers: 1
      }), new _core.MoveGesture({
        name: 'move',
        preventIf: ['pan', 'pinch'] // Prevent move gesture when pan is active
      }), new _core.PinchGesture({
        name: 'pinch',
        threshold: 5,
        preventIf: ['pan']
      }), new _core.TurnWheelGesture({
        name: 'turnWheel',
        sensitivity: 0.01,
        initialDelta: 1
      }), new _core.TapGesture({
        name: 'tap',
        maxDistance: 10,
        preventIf: ['pan', 'pinch']
      }), new _core.PressGesture({
        name: 'quickPress',
        duration: 50,
        maxDistance: 10
      })]
    });
    gestureManager.registerElement(['pan', 'move', 'pinch', 'turnWheel', 'tap', 'quickPress'], svg);
    return () => {
      // Cleanup gesture manager
      gestureManager.destroy();
    };
  }, [svgRef]);
  const addInteractionListener = React.useCallback((interaction, callback, options) => {
    // Forcefully cast the svgRef to any, it is annoying to fix the types.
    const svg = svgRef.current;
    svg?.addEventListener(interaction, callback, options);
    return {
      cleanup: () => svg?.removeEventListener(interaction, callback)
    };
  }, [svgRef]);
  React.useEffect(() => {
    const svg = svgRef.current;

    // Disable gesture on safari
    // https://use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
    svg?.addEventListener('gesturestart', preventDefault);
    svg?.addEventListener('gesturechange', preventDefault);
    svg?.addEventListener('gestureend', preventDefault);
    return () => {
      svg?.removeEventListener('gesturestart', preventDefault);
      svg?.removeEventListener('gesturechange', preventDefault);
      svg?.removeEventListener('gestureend', preventDefault);
    };
  }, [svgRef]);
  return {
    instance: {
      addInteractionListener
    }
  };
};
exports.useChartInteractionListener = useChartInteractionListener;
useChartInteractionListener.params = {};
useChartInteractionListener.getInitialState = () => {
  return {};
};