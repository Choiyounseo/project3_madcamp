import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

//account schema를 만들고, model로 만든후 export실행
const Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now },
    admin: {type: Boolean, default: false }
});

// const count = (user) => {
//     newUser = user;
//     return Account.count({}).exec()
// };

// if( count === 1 ) {
//     this.admin = true;
// }

Account.statics.create = function(username, password) {
    const user = new this({
        username,
        password
    })
    return user.save()
};

Account.statics.findOneByUsername = function(username) {
    return this.findOne({
        username
    }).exec()
};

// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('account', Account);
