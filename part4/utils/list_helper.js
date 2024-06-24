const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const maxBlog = blogs.reduce(function (prev, current) {
    return prev.likes >= current.likes ? prev : current;
  });
  return maxBlog;
};

const mostBlogs = (blogs) => {
  let authors = lodash.reduce(
    blogs,
    (total, next) => {
      total[next.author] = (total[next.author] || 0) + 1;
      return total;
    },
    {}
  );
  let mostAuthor = {
    author: "",
    blogs: 0,
  };
  for (property in authors) {
    if (mostAuthor.blogs <= authors[property]) {
      mostAuthor.author = property;
      mostAuthor.blogs = authors[property];
    }
  }
  return mostAuthor;
};

const mostLikes = (blogs) => {
  let authors = {};
  blogs.forEach((blog) => {
    authors[blog.author] =
      authors[blog.author] === undefined
        ? blog.likes
        : authors[blog.author] + blog.likes;
  });
  let mostAuthor = {
    author: "",
    likes: 0,
  };
  for (property in authors) {
    if (mostAuthor.likes <= authors[property]) {
      mostAuthor.author = property;
      mostAuthor.likes = authors[property];
    }
  }
  return mostAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
