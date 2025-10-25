"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUpdateOptions = void 0;
var _core = require("../../core");
var _ActiveGesturesRegistry = require("../../core/ActiveGesturesRegistry");
var _messages = require("../messages");
const toUpdateOptions = exports.toUpdateOptions = function toUpdateOptions(received, expected) {
  // Check if the matcher is being used with .not and throw an error since it's not supported
  if (this.isNot) {
    throw new Error(_messages.messages.negationError('toUpdateOptions'));
  }
  // Validate inputs
  if (!received) {
    return {
      pass: false,
      message: _messages.messages.invalidClass
    };
  }
  if (!expected || typeof expected !== 'object' || Object.keys(expected).length === 0) {
    return {
      pass: false,
      message: () => _messages.messages.invalidOrEmptyObjectParam('options')
    };
  }

  // eslint-disable-next-line new-cap
  const original = new received({
    name: 'updateOptions'
  });
  // eslint-disable-next-line new-cap
  const clone = new received({
    name: 'updateOptions'
  });
  const expectedOptions = expected;
  const target = document.createElement('div');
  document.body.appendChild(target);
  const pointerManager = new _core.PointerManager({});
  const gestureRegistry = new _ActiveGesturesRegistry.ActiveGesturesRegistry();
  const keyboardManager = new _core.KeyboardManager();

  // Setup the environment for testing
  clone.init(target, pointerManager, gestureRegistry, keyboardManager);

  // Create and dispatch the change options event
  const changeOptionsEvent = new CustomEvent(`${clone.name}ChangeOptions`, {
    detail: expectedOptions
  });
  target.dispatchEvent(changeOptionsEvent);

  // Collect actual and original option values
  const actualOptions = {};
  const originalOptions = {};

  // Track which keys didn't update correctly
  const incorrectKeys = [];
  for (const key in expectedOptions) {
    if (Reflect.has(clone, key)) {
      // @ts-expect-error, we checked that the key exists
      actualOptions[key] = clone[key];
      // @ts-expect-error, we don't care if the key exists
      originalOptions[key] = original[key];

      // Track keys that didn't update as expected
      // @ts-expect-error, we checked that the key exists
      if (!this.equals(clone[key], expectedOptions[key])) {
        incorrectKeys.push(key);
      }
    }
  }

  // Clean up
  clone.destroy();
  document.body.removeChild(target);
  const hasUpdated = this.equals(actualOptions, expectedOptions);
  const isSameAsOriginal = this.equals(originalOptions, expectedOptions);
  const pass = hasUpdated && !isSameAsOriginal;

  // If pass, we set the message if the "not" condition is true
  if (pass) {
    return {
      pass: true,
      message: () => 'Expected options not to be updatable to the specified values, but they were.',
      actual: actualOptions,
      expected: expectedOptions
    };
  }
  return {
    pass: false,
    message: () => {
      if (isSameAsOriginal) {
        return 'Expected options to be updated, but they remained the same as the original.';
      }
      return 'Expected options to be updated to the specified values, but they were not.';
    },
    actual: actualOptions,
    expected: expectedOptions
  };
};