"use strict";

var _vitest = require("vitest");
var _toBeClonable = require("./matchers/toBeClonable");
var _toUpdateOptions = require("./matchers/toUpdateOptions");
var _toUpdateState = require("./matchers/toUpdateState");
_vitest.expect.extend({
  toUpdateOptions: _toUpdateOptions.toUpdateOptions,
  toBeClonable: _toBeClonable.toBeClonable,
  toUpdateState: _toUpdateState.toUpdateState
});