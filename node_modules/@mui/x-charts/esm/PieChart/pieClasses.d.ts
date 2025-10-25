export interface PieClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the `g` element that contains all pie arcs of a series. */
  series: string;
  /** Styles applied to the `g` element that contains all pie arc labels of a series. */
  seriesLabels: string;
}
export type PieClassKey = keyof PieClasses;
export declare function getPieUtilityClass(slot: string): string;
export declare const pieClasses: PieClasses;
export declare const useUtilityClasses: (classes?: Partial<PieClasses>) => Record<"series" | "root" | "seriesLabels", string>;