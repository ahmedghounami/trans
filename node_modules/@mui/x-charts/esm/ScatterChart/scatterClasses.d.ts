export interface ScatterClasses {
  /** Styles applied to the root element. */
  root: string;
}
export type ScatterClassKey = keyof ScatterClasses;
export declare function getScatterUtilityClass(slot: string): string;
export declare const scatterClasses: ScatterClasses;
export declare const useUtilityClasses: (classes?: Partial<ScatterClasses>) => Record<"root", string>;