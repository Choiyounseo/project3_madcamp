'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Coffee = new Schema({
    coffeeusername: String,
    coffeename: String,
    cost: Number,
    date: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('coffee', Coffee);