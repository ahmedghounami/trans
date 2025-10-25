import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable no-cond-assign */
/* eslint-disable lines-between-class-members */

export class Store {
  static create(state) {
    return new Store(state);
  }
  constructor(state) {
    this.state = void 0;
    // HACK: `any` fixes adding listeners that accept partial state.
    this.listeners = void 0;
    // Internal state to handle recursive `setState()` calls
    this.isUpdating = void 0;
    this.needsReset = void 0;
    this.subscribe = fn => {
      this.listeners.add(fn);
      return () => {
        this.listeners.delete(fn);
      };
    };
    this.getSnapshot = () => {
      return this.state;
    };
    this.state = state;
    this.listeners = new Set();
    this.isUpdating = false;
    this.needsReset = false;
  }
  setState(newState) {
    this.state = newState;
    if (this.isUpdating) {
      this.needsReset = true;
      return;
    }
    this.isUpdating = true;
    let it = this.listeners.values();
    let result;
    while (result = it.next(), !result.done) {
      if (this.needsReset) {
        this.needsReset = false;
        it = this.listeners.values();
        continue;
      }
      const listener = result.value;
      listener(newState);
    }
    this.isUpdating = false;
  }
  update(changes) {
    for (const key in changes) {
      if (!Object.is(this.state[key], changes[key])) {
        this.setState(_extends({}, this.state, changes));
        return;
      }
    }
  }
  set(key, value) {
    if (!Object.is(this.state[key], value)) {
      this.setState(_extends({}, this.state, {
        [key]: value
      }));
    }
  }
}