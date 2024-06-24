import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <p key={blog.id}>
            <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
          </p>
        ))}
    </div>
  );
};

export default Blogs;
