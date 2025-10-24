"use strict";
'use client';

/* eslint-disable react-compiler/react-compiler */
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLazySelectorEffect = useLazySelectorEffect;
var React = _interopRequireWildcard(require("react"));
var _useLazyRef = _interopRequireDefault(require("@mui/utils/useLazyRef"));
const noop = () => {};
function useLazySelectorEffect(store, selector, effect,
/**
 * If true, the selector will be ignored.
 */
skip) {
  const instance = (0, _useLazyRef.default)(initialize, {
    store,
    selector,
    skip
  }).current;
  instance.effect = effect;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(instance.onMount(skip), [skip]);
}

// `useLazyRef` typings are incorrect, `params` should not be optional
function initialize(params) {
  const {
    store,
    selector,
    skip: initialSkip
  } = params;
  let isRunning = false;
  let previousState;

  // We want a single subscription done right away and cleared on unmount only,
  // but React triggers `useOnMount` multiple times in dev, so we need to manage
  // the subscription anyway.
  const subscribe = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    instance.dispose ?? (instance.dispose = store.subscribe(state => {
      const nextState = selector(state);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      instance.effect(previousState, nextState);
      previousState = nextState;
    }));
  };
  const instance = {
    effect: noop,
    dispose: null,
    onMount: skip => () => {
      if (skip) {
        return undefined;
      }
      if (!isRunning) {
        // Initialize values
        isRunning = true;
        previousState = selector(store.value);
      }
      subscribe();
      return () => {
        instance.dispose?.();
        instance.dispose = null;
      };
    }
  };
  if (!initialSkip) {
    // Initialize values
    isRunning = true;
    previousState = selector(store.value);
    subscribe();
  }
  return instance;
}