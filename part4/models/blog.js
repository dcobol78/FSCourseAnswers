const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  visible: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
