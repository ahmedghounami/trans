let cartesianInstance;
let polarInstance;
class CartesianSeriesTypes {
  types = (() => new Set())();
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
  types = (() => new Set())();
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
export const cartesianSeriesTypes = new CartesianSeriesTypes();
cartesianSeriesTypes.addType('bar');
cartesianSeriesTypes.addType('line');
cartesianSeriesTypes.addType('scatter');
export const polarSeriesTypes = new PolarSeriesTypes();
polarSeriesTypes.addType('radar');