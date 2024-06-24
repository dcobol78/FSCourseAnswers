import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotify, hideNotify } from '../reducers/notificationReducer';
import { Form, Button } from 'react-bootstrap';

import React from 'react';
const CreateBlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    dispatch(createBlog(blog));
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility();
    }
    document.getElementById('new-blog-form').reset();
    dispatch(
      setNotify('successs', `a new blog ${blog.title} by ${blog.author} added`)
    );
    setTimeout(() => {
      dispatch(hideNotify());
    }, 5000);
  };

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleCreateBlog} id="new-blog-form">
        <Form.Group>
          <Form.Label>title: </Form.Label>
          <Form.Control type="text" name="title" id="titleInput" />
          <Form.Label>author:</Form.Label>{' '}
          <Form.Control type="text" name="author" id="authorInput" />
          <Form.Label>url:</Form.Label>{' '}
          <Form.Control type="text" name="url" id="urlInput" />
          <Button type="create" id="create-button">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateBlogForm;
