import { AxisValueFormatterContext, ContinuousScaleName, D3ContinuousScale } from "../models/axis.js";
/**
 * Creates a default formatter function for continuous scales (e.g., linear, sqrt, log).
 * @returns A formatter function for continuous values.
 */
export declare function createScalarFormatter(tickNumber: number, zoomScale: D3ContinuousScale): <S extends ContinuousScaleName = ContinuousScaleName>(value: any, context: AxisValueFormatterContext<S>) => string;