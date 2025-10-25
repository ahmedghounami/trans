"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarClipPath = BarClipPath;
exports.useAnimateBarClipPath = useAnimateBarClipPath;
var React = _interopRequireWildcard(require("react"));
var _d3Interpolate = require("@mui/x-charts-vendor/d3-interpolate");
var _animation = require("../hooks/animation");
var _jsxRuntime = require("react/jsx-runtime");
function barClipPathPropsInterpolator(from, to) {
  const interpolateX = (0, _d3Interpolate.interpolateNumber)(from.x, to.x);
  const interpolateY = (0, _d3Interpolate.interpolateNumber)(from.y, to.y);
  const interpolateWidth = (0, _d3Interpolate.interpolateNumber)(from.width, to.width);
  const interpolateHeight = (0, _d3Interpolate.interpolateNumber)(from.height, to.height);
  const interpolateBorderRadius = (0, _d3Interpolate.interpolateNumber)(from.borderRadius, to.borderRadius);
  return t => {
    return {
      x: interpolateX(t),
      y: interpolateY(t),
      width: interpolateWidth(t),
      height: interpolateHeight(t),
      borderRadius: interpolateBorderRadius(t)
    };
  };
}
function useAnimateBarClipPath(props) {
  const initialProps = {
    x: props.layout === 'vertical' ? props.x : props.xOrigin,
    y: props.layout === 'vertical' ? props.yOrigin : props.y,
    width: props.layout === 'vertical' ? props.width : 0,
    height: props.layout === 'vertical' ? 0 : props.height,
    borderRadius: props.borderRadius
  };
  return (0, _animation.useAnimate)({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius
  }, {
    createInterpolator: barClipPathPropsInterpolator,
    transformProps: p => ({
      d: generateClipPath(props.hasNegative, props.hasPositive, props.layout, p.x, p.y, p.width, p.height, props.xOrigin, props.yOrigin, p.borderRadius)
    }),
    applyProps(element, {
      d
    }) {
      if (d) {
        element.setAttribute('d', d);
      }
    },
    initialProps,
    skip: props.skipAnimation,
    ref: props.ref
  });
}
/**
 * @ignore - internal component.
 */
function BarClipPath(props) {
  const {
    maskId,
    x,
    y,
    width,
    height,
    skipAnimation
  } = props;
  const {
    ref,
    d
  } = useAnimateBarClipPath({
    layout: props.layout ?? 'vertical',
    hasNegative: props.hasNegative,
    hasPositive: props.hasPositive,
    xOrigin: props.xOrigin,
    yOrigin: props.yOrigin,
    x,
    y,
    width,
    height,
    borderRadius: props.borderRadius ?? 0,
    skipAnimation
  });
  if (!props.borderRadius || props.borderRadius <= 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
    id: maskId,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      ref: ref,
      d: d
    })
  });
}
function generateClipPath(hasNegative, hasPositive, layout, x, y, width, height, xOrigin, yOrigin, borderRadius) {
  if (layout === 'vertical') {
    if (hasPositive && hasNegative) {
      const bR = Math.min(borderRadius, width / 2, height / 2);
      return `M${x},${y + height / 2} v${-(height / 2 - bR)} a${bR},${bR} 0 0 1 ${bR},${-bR} h${width - bR * 2} a${bR},${bR} 0 0 1 ${bR},${bR} v${height - 2 * bR} a${bR},${bR} 0 0 1 ${-bR},${bR} h${-(width - bR * 2)} a${bR},${bR} 0 0 1 ${-bR},${-bR} v${-(height / 2 - bR)}`;
    }
    const bR = Math.min(borderRadius, width / 2);
    if (hasPositive) {
      return `M${x},${Math.max(yOrigin, y + bR)} v${Math.min(0, -(yOrigin - y - bR))} a${bR},${bR} 0 0 1 ${bR},${-bR} h${width - bR * 2} a${bR},${bR} 0 0 1 ${bR},${bR} v${Math.max(0, yOrigin - y - bR)} Z`;
    }
    if (hasNegative) {
      return `M${x},${Math.min(yOrigin, y + height - bR)} v${Math.max(0, height - bR)} a${bR},${bR} 0 0 0 ${bR},${bR} h${width - bR * 2} a${bR},${bR} 0 0 0 ${bR},${-bR} v${-Math.max(0, height - bR)} Z`;
    }
  }
  if (layout === 'horizontal') {
    if (hasPositive && hasNegative) {
      const bR = Math.min(borderRadius, width / 2, height / 2);
      return `M${x + width / 2},${y} h${width / 2 - bR} a${bR},${bR} 0 0 1 ${bR},${bR} v${height - bR * 2} a${bR},${bR} 0 0 1 ${-bR},${bR} h${-(width - 2 * bR)} a${bR},${bR} 0 0 1 ${-bR},${-bR} v${-(height - bR * 2)} a${bR},${bR} 0 0 1 ${bR},${-bR} h${width / 2 - bR}`;
    }
    const bR = Math.min(borderRadius, height / 2);
    if (hasPositive) {
      return `M${Math.min(xOrigin, x - bR)},${y} h${width} a${bR},${bR} 0 0 1 ${bR},${bR} v${height - bR * 2} a${bR},${bR} 0 0 1 ${-bR},${bR} h${-width} Z`;
    }
    if (hasNegative) {
      return `M${Math.max(xOrigin, x + width + bR)},${y} h${-width} a${bR},${bR} 0 0 0 ${-bR},${bR} v${height - bR * 2} a${bR},${bR} 0 0 0 ${bR},${bR} h${width} Z`;
    }
  }
  return undefined;
}