const commentsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', { title: 1 });
  response.json(comments.map((c) => c.toJSON()));
});

commentsRouter.post('/', async (request, response) => {
  if (!request.body.comment) {
    return response.status(400).json({
      error: 'comment is missing.',
    });
  }
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(body.blogId);

  const comment = new Comment({
    comment: body.comment,
    user: user._id,
    blog: blog._id,
  });
  const savedComment = await comment.save();
  user.comments = user.comments.concat(savedComment._id);
  blog.comments = blog.comments.concat(savedComment._id);
  await user.save();
  await blog.save();
  const opts = [{ path: 'blog', options: { title: 10 } }];
  Comment.populate(savedComment, opts, function (err, comment) {
    response.status(201).json(comment.toJSON());
  });
});

module.exports = commentsRouter;
