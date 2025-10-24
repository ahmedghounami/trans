import { ToBeClonable } from "./matchers/toBeClonable.js";
import { ToUpdateOptions } from "./matchers/toUpdateOptions.js";
import { ToUpdateState } from "./matchers/toUpdateState.js";
declare module 'vitest' {
  interface Matchers<T = any> extends GestureMatchers<T> {}
}
export type GestureMatchers<R = any> = ToUpdateOptions<R> & ToBeClonable<R> & ToUpdateState<R>;