import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Coffee = new Schema({
    coffeeusername: String,
    coffeename: String,
    cost: Number,
    date: {type: Date, default: Date.now }
});

export default mongoose.model('coffee', Coffee);
