import * as React from 'react';
import { RenderProp } from '@mui/x-internals/useComponentRenderer';
import { ChartsSlotProps } from "../internals/material/index.js";
export type ToolbarButtonProps = ChartsSlotProps['baseIconButton'] & {
  /**
   * A function to customize the rendering of the component.
   */
  render?: RenderProp<ChartsSlotProps['baseIconButton']>;
};
declare const ToolbarButton: React.ForwardRefExoticComponent<Omit<ToolbarButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { ToolbarButton };