import { expect } from 'vitest';
import { toBeClonable } from "./matchers/toBeClonable.js";
import { toUpdateOptions } from "./matchers/toUpdateOptions.js";
import { toUpdateState } from "./matchers/toUpdateState.js";
expect.extend({
  toUpdateOptions,
  toBeClonable,
  toUpdateState
});