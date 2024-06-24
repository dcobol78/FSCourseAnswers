const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// GET ALL BLOGS
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  // response.json(blogs);
  response.json(blogs.map((b) => b.toJSON()));
});

// GET ONE BLOG
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id).then((blog) => {
    response.json(blog.toJSON());
  });
  // .catch((error) => next(error));
});

// DELETE ONE BLOG
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401)({
      error: 'token missing or invalid',
    });
  }
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({
      error: 'only the creater can remove this blog.',
    });
  }

  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// POST ONE BLOG
blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: 'title or url is missing',
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    visible: body.alive,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
});

// CHANGE ONE BLOG
blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.json(blog.toJSON());
});

module.exports = blogsRouter;
