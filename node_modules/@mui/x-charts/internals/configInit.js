"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polarSeriesTypes = exports.cartesianSeriesTypes = void 0;
let cartesianInstance;
let polarInstance;
class CartesianSeriesTypes {
  types = new Set();
  constructor() {
    if (cartesianInstance) {
      throw new Error('You can only create one instance!');
    }
    cartesianInstance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
}
class PolarSeriesTypes {
  types = new Set();
  constructor() {
    if (polarInstance) {
      throw new Error('You can only create one instance!');
    }
    polarInstance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
}
const cartesianSeriesTypes = exports.cartesianSeriesTypes = new CartesianSeriesTypes();
cartesianSeriesTypes.addType('bar');
cartesianSeriesTypes.addType('line');
cartesianSeriesTypes.addType('scatter');
const polarSeriesTypes = exports.polarSeriesTypes = new PolarSeriesTypes();
polarSeriesTypes.addType('radar');