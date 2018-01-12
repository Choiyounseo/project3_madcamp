import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Notification = new Schema({
    writer: String,
    contents: String,
    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
  },
  {
    usePushEach:true
  });

export default mongoose.model('notification', Notification);
