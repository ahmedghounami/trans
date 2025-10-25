import * as React from 'react';
interface UseAnimateBarClipPathParams {
  ref?: React.Ref<SVGPathElement>;
  layout: 'vertical' | 'horizontal';
  hasNegative: boolean;
  hasPositive: boolean;
  xOrigin: number;
  yOrigin: number;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  skipAnimation: boolean;
}
export declare function useAnimateBarClipPath(props: UseAnimateBarClipPathParams): import("../index.js").UseAnimateReturn<SVGPathElement, {
  d: string | undefined;
}>;
export interface BarClipPathProps {
  maskId: string;
  borderRadius?: number;
  hasNegative: boolean;
  hasPositive: boolean;
  layout?: 'vertical' | 'horizontal';
  x: number;
  y: number;
  xOrigin: number;
  yOrigin: number;
  width: number;
  height: number;
  skipAnimation: boolean;
}
/**
 * @ignore - internal component.
 */
declare function BarClipPath(props: BarClipPathProps): React.JSX.Element | null;
export { BarClipPath };