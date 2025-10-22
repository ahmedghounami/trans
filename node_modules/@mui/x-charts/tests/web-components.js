"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactToWebComponent = reactToWebComponent;
const renderSymbol = Symbol.for('render');
const connectedSymbol = Symbol.for('connected');
const contextSymbol = Symbol.for('context');
const propsSymbol = Symbol.for('props');

// This function creates a custom web component that wraps a React component.
// Adapted from https://github.com/bitovi/react-to-web-component/blob/b1372bfd7bc67fe49920db840f1ed9cf736b2724/packages/core/src/core.ts
function reactToWebComponent(ReactComponent, options, renderer) {
  class ReactWebComponent extends HTMLElement {
    static get observedAttributes() {
      return [];
    }
    [connectedSymbol] = true;
    [propsSymbol] = {};
    constructor() {
      super();
      if (options.shadow) {
        this.container = this.attachShadow({
          mode: options.shadow
        });
      } else {
        this.container = this;
      }
      this[propsSymbol].container = this.container;
    }
    connectedCallback() {
      this[connectedSymbol] = true;
      this[renderSymbol]();
    }
    disconnectedCallback() {
      this[connectedSymbol] = false;
      if (this[contextSymbol]) {
        renderer.unmount(this[contextSymbol]);
      }
      delete this[contextSymbol];
    }
    [renderSymbol]() {
      if (!this[connectedSymbol]) {
        return;
      }
      if (!this[contextSymbol]) {
        this[contextSymbol] = renderer.mount(this.container, ReactComponent, this[propsSymbol]);
      }
    }
  }
  return ReactWebComponent;
}