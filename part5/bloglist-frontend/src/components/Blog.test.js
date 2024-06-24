import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import Blog from './Blog';

test('renders only title and author', () => {
  const blog = {
    title: 'blog-title',
    author: 'blog-author',
    url: 'blog-url',
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent('blog-title blog-author');
  expect(component.container).not.toHaveTextContent('blog-url');
  expect(component.container).not.toHaveTextContent('likes 0');
  const button = component.container.querySelector('button');
  fireEvent.click(button);
  expect(component.container).toHaveTextContent('blog-url');
  expect(component.container).toHaveTextContent('likes 0');
});

test('when clicked other details are shown', () => {
  const blog = {
    title: 'blog-title',
    author: 'blog-author',
    url: 'blog-url',
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);
  const button = component.container.querySelector('button');
  fireEvent.click(button);
  expect(component.container).toHaveTextContent('blog-url');
  expect(component.container).toHaveTextContent('likes 0');
});

test('when clicked like button twice handler called twice', () => {
  const blog = {
    title: 'blog-title',
    author: 'blog-author',
    url: 'blog-url',
    likes: 0,
  };
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} likeHandler={mockHandler} />);
  const button = component.container.querySelector('button');
  fireEvent.click(button);
  const likeButotn = component.getByText('like');
  fireEvent.click(likeButotn);

  fireEvent.click(likeButotn);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
