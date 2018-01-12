'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _coffee = require('../models/coffee');

var _coffee2 = _interopRequireDefault(_coffee);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/buy', function (req, res) {

    var coffee = new _coffee2.default({
        coffeeusername: req.body.coffeeusername,
        coffeename: req.body.coffeename,
        cost: req.body.cost
    });

    coffee.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

exports.default = router;