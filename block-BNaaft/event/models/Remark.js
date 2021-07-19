let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let remarkSchema = new Schema(
  {
    title: { type: String, require: true },
    author: String,

    likes: { type: Number, default: 0 },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  },
  { timestamps: true }
);

let Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;