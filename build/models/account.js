'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

//account schema를 만들고, model로 만든후 export실행
var Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false }
});

// const count = (user) => {
//     newUser = user;
//     return Account.count({}).exec()
// };

// if( count === 1 ) {
//     this.admin = true;
// }

Account.statics.create = function (username, password) {
    var user = new this({
        username: username,
        password: password
    });
    return user.save();
};

Account.statics.findOneByUsername = function (username) {
    return this.findOne({
        username: username
    }).exec();
};

// generates hash
Account.methods.generateHash = function (password) {
    return _bcryptjs2.default.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function (password) {
    return _bcryptjs2.default.compareSync(password, this.password);
};

exports.default = _mongoose2.default.model('account', Account);