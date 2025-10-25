"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartStore = void 0;
class ChartStore {
  constructor(value) {
    this.value = value;
    this.listeners = new Set();
  }
  subscribe = fn => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };
  getSnapshot = () => {
    return this.value;
  };
  update = updater => {
    const newState = updater(this.value);
    if (newState !== this.value) {
      this.value = newState;
      this.listeners.forEach(l => l(newState));
    }
  };
}
exports.ChartStore = ChartStore;