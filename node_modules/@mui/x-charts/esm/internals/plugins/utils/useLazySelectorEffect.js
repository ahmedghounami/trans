'use client';

/* eslint-disable react-compiler/react-compiler */
import * as React from 'react';
import useLazyRef from '@mui/utils/useLazyRef';
const noop = () => {};
export function useLazySelectorEffect(store, selector, effect,
/**
 * If true, the selector will be ignored.
 */
skip) {
  const instance = useLazyRef(initialize, {
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
    instance.dispose ??= store.subscribe(state => {
      const nextState = selector(state);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      instance.effect(previousState, nextState);
      previousState = nextState;
    });
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