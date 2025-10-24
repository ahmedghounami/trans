import { KeyboardManager, PointerManager } from "../../core/index.js";
import { ActiveGesturesRegistry } from "../../core/ActiveGesturesRegistry.js";
import { messages } from "../messages.js";
export const toUpdateState = function toUpdateState(received, expected) {
  // Check if the matcher is being used with .not and throw an error since it's not supported
  if (this.isNot) {
    throw new Error(messages.negationError('toUpdateState'));
  }

  // Validate inputs
  if (!received) {
    return {
      pass: false,
      message: messages.invalidClass
    };
  }
  if (!expected || typeof expected !== 'object' || Object.keys(expected).length === 0) {
    return {
      pass: false,
      message: () => messages.invalidOrEmptyObjectParam('state')
    };
  }

  // eslint-disable-next-line new-cap
  const original = new received({
    name: 'updateState'
  });
  // eslint-disable-next-line new-cap
  const clone = new received({
    name: 'updateState'
  });
  const expectedState = expected;
  const target = document.createElement('div');
  document.body.appendChild(target);
  const pointerManager = new PointerManager({});
  const gestureRegistry = new ActiveGesturesRegistry();
  const keyboardManager = new KeyboardManager();

  // Setup the environment for testing
  clone.init(target, pointerManager, gestureRegistry, keyboardManager);

  // Create and dispatch the change state event
  const changeStateEvent = new CustomEvent(`${clone.name}ChangeState`, {
    detail: expectedState
  });
  target.dispatchEvent(changeStateEvent);
  const actualStateValues = {};
  const originalStateValues = {};

  // Track which keys didn't update correctly
  const incorrectKeys = [];

  // @ts-expect-error, accessing protected property for testing
  const cloneState = clone.state;
  // @ts-expect-error, accessing protected property for testing
  const originalState = original.state;

  // Only compare keys that are in the expected state
  for (const key in expectedState) {
    if (Reflect.has(cloneState, key)) {
      // @ts-expect-error, we checked that the key exists
      actualStateValues[key] = cloneState[key];
      // @ts-expect-error, we don't care if the key exists
      originalStateValues[key] = originalState[key];

      // Track keys that didn't update as expected
      // @ts-expect-error, we checked that the key exists
      if (!this.equals(cloneState[key], expectedState[key])) {
        incorrectKeys.push(key);
      }
    }
  }

  // Clean up
  clone.destroy();
  document.body.removeChild(target);
  const hasUpdated = this.equals(actualStateValues, expectedState);
  const isSameAsOriginal = this.equals(originalStateValues, expectedState);
  const pass = hasUpdated && !isSameAsOriginal;

  // If pass, we set the message if the "not" condition is true
  if (pass) {
    return {
      pass: true,
      message: () => 'Expected state not to be updatable to the specified values, but it was.',
      actual: actualStateValues,
      expected: expectedState
    };
  }
  return {
    pass: false,
    message: () => {
      if (isSameAsOriginal) {
        return 'Expected state to be updated, but it remained the same as the original.';
      }
      return 'Expected state to be updated to the specified values, but it was not.';
    },
    actual: actualStateValues,
    expected: expectedState
  };
};