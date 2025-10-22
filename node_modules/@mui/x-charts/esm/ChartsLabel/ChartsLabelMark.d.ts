import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { ChartsLabelMarkClasses } from "./labelMarkClasses.js";
export interface ChartsLabelCustomMarkProps {
  className?: string;
  /** Color of the series this mark refers to. */
  color?: string;
}
export type ChartsLabelMarkType = 'square' | 'circle' | 'line' | React.ComponentType<ChartsLabelCustomMarkProps>;
export interface ChartsLabelMarkProps {
  /**
   * The type of the mark.
   * @default 'square'
   */
  type?: ChartsLabelMarkType;
  /**
   * The color of the mark.
   */
  color?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ChartsLabelMarkClasses>;
  className?: string;
  sx?: SxProps<Theme>;
}
/**
 * Generates the label mark for the tooltip and legend.
 * @ignore - internal component.
 */
declare const ChartsLabelMark: React.ForwardRefExoticComponent<ChartsLabelMarkProps & React.RefAttributes<{}>>;
export { ChartsLabelMark };