"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MouseUserGesture = require("./MouseUserGesture");
Object.keys(_MouseUserGesture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MouseUserGesture[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MouseUserGesture[key];
    }
  });
});
var _TouchUserGesture = require("./TouchUserGesture");
Object.keys(_TouchUserGesture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TouchUserGesture[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TouchUserGesture[key];
    }
  });
});
var _UserGesture = require("./UserGesture");
Object.keys(_UserGesture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UserGesture[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _UserGesture[key];
    }
  });
});