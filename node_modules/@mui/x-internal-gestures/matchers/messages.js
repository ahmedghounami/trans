"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = void 0;
const messages = exports.messages = {
  invalidClass: () => 'Expected a valid gesture class, but received invalid input or an instantiated class instead.',
  invalidOrEmptyObjectParam: paramName => `Expected a non-empty ${paramName} object, but received invalid or empty ${paramName}.`,
  invalidObjectParam: paramName => `Expected valid ${paramName}, but received an invalid value.`,
  negationError: matcherName => `${matcherName} matcher does not support negation. Use expect().${matcherName}() instead of expect().not.${matcherName}().`
};