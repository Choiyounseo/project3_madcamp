'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _notification = require('../models/notification');

var _notification2 = _interopRequireDefault(_notification);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
    WRITE Notice: POST /api/notice
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/', function (req, res) {
    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW notice
    var notice = new _notification2.default({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    // SAVE IN DATABASE
    notice.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

/*
    MODIFY notice: PUT /api/notice/:id
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: NOT LOGGED IN
        4: NO RESOURCE
        5: PERMISSION FAILURE
*/
router.put('/:id', function (req, res) {

    // CHECK notice ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND Notice
    _notification2.default.findById(req.params.id, function (err, notice) {
        if (err) throw err;

        // IF notice DOES NOT EXIST
        if (!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if (notice.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        notice.contents = req.body.contents;
        notice.date.edited = new Date();
        notice.is_edited = true;

        notice.save(function (err, notice) {
            if (err) throw err;
            return res.json({
                success: true,
                notice: notice
            });
        });
    });
});

/*
    DELETE notice: DELETE /api/notice/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.delete('/:id', function (req, res) {

    // CHECK notice ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND notice AND CHECK FOR WRITER
    _notification2.default.findById(req.params.id, function (err, notice) {
        if (err) throw err;

        if (!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        if (notice.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE notice
        _notification2.default.remove({ _id: req.params.id }, function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

/*
    READ Notice: GET /api/Notice
*/
router.get('/', function (req, res) {
    _notification2.default.find().sort({ "_id": -1 }).limit(6).exec(function (err, notices) {
        if (err) throw err;
        res.json(notices);
    });
});

/*
    READ ADDITIONAL (OLD/NEW) notice: GET /api/notice/:listType/:id
*/
router.get('/:listType/:id', function (req, res) {
    var listType = req.params.listType;
    var id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if (listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    // CHECK notice ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    var objId = new _mongoose2.default.Types.ObjectId(req.params.id);

    if (listType === 'new') {
        // GET NEWER notice
        _notification2.default.find({ _id: { $gt: objId } }).sort({ _id: -1 }).limit(6).exec(function (err, notices) {
            if (err) throw err;
            return res.json(notices);
        });
    } else {
        // GET OLDER notice
        _notification2.default.find({ _id: { $lt: objId } }).sort({ _id: -1 }).limit(6).exec(function (err, notices) {
            if (err) throw err;
            return res.json(notices);
        });
    }
});

/*
    TOGGLES STAR OF notice: POST /api/notice/star/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
*/
router.post('/star/:id', function (req, res) {
    // CHECK notice ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND notice
    _notification2.default.findById(req.params.id, function (err, notice) {
        if (err) throw err;

        // notice DOES NOT EXIST
        if (!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        // GET INDEX OF USERNAME IN THE ARRAY

        var index = notice.starred.indexOf(req.session.loginInfo.username);

        // CHECK WHETHER THE USER ALREADY HAS GIVEN A STAR
        var hasStarred = index === -1 ? false : true;

        if (!hasStarred) {
            // IF IT DOES NOT EXIST
            notice.starred.push(req.session.loginInfo.username);
        } else {
            // ALREADY starred
            notice.starred.splice(index, 1);
        }

        // SAVE THE notice
        notice.save(function (err, notice) {
            if (err) throw err;
            res.json({
                success: true,
                'has_starred': !hasStarred,
                notice: notice
            });
        });
    });
});

/*
    READ notice OF A USER: GET /api/notice/:username
*/
router.get('/:username', function (req, res) {
    _notification2.default.find({ writer: req.params.username }).sort({ "_id": -1 }).limit(6).exec(function (err, notices) {
        if (err) throw err;
        res.json(notices);
    });
});

/*
    READ ADDITIONAL (OLD/NEW) notice OF A USER: GET /api/notice/:username/:listType/:id
*/
router.get('/:username/:listType/:id', function (req, res) {
    var listType = req.params.listType;
    var id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if (listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    // CHECK notice ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    var objId = new _mongoose2.default.Types.ObjectId(req.params.id);

    if (listType === 'new') {
        // GET NEWER notice
        _notification2.default.find({ writer: req.params.username, _id: { $gt: objId } }).sort({ _id: -1 }).limit(6).exec(function (err, notices) {
            if (err) throw err;
            return res.json(notices);
        });
    } else {
        // GET OLDER notice
        _notification2.default.find({ writer: req.params.username, _id: { $lt: objId } }).sort({ _id: -1 }).limit(6).exec(function (err, notices) {
            if (err) throw err;
            return res.json(notices);
        });
    }
});

exports.default = router;