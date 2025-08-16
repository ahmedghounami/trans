import * as React from 'react';
import { RenderProp } from '@mui/x-internals/useComponentRenderer';
declare const ToolbarRoot: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}>;
export interface ToolbarProps extends React.ComponentProps<'div'> {
  className?: string;
  /**
   * A function to customize rendering of the component.
   */
  render?: RenderProp<React.ComponentProps<typeof ToolbarRoot>>;
}
export declare const Toolbar: React.ForwardRefExoticComponent<Omit<ToolbarProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export {};