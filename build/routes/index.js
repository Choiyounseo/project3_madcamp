'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _memo = require('./memo');

var _memo2 = _interopRequireDefault(_memo);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

var _coffee = require('./coffee');

var _coffee2 = _interopRequireDefault(_coffee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/*', function (req, res, next) {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/account', _account2.default);
router.use('/memo', _memo2.default);
router.use('/notification', _notification2.default);
router.use('/coffee', _coffee2.default);

exports.default = router;