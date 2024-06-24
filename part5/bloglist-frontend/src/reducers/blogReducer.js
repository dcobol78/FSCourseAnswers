/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data];
    case 'UPDATE_BLOG':
      const oldlessState = state.filter((b) => b.id !== action.data.id);
      return [...oldlessState, action.data];
    case 'DELETE_BLOG':
      const deletedState = state.filter((b) => b.id !== action.data.id);
      return [...deletedState];
    case 'CHANGE_BLOG_VISIBILITY':
      const visToChange = state.find((b) => b.id === action.data.id);
      const newBlog = {
        ...visToChange,
        visible: !visToChange.visible,
      };
      return state.map((b) => (b.id === action.data.id ? newBlog : b));
    case 'LIKE_BLOG':
      const toLikedBlog = state.find((b) => b.id === action.data.id);
      const likedBlog = {
        ...toLikedBlog,
        likes: toLikedBlog.likes + 1,
      };
      return state.map((b) => (b.id === action.data.id ? likedBlog : b));
    case 'GET_ALL_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    });
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id);
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch({
      type: 'DELETE_BLOG',
      data: blog,
    });
  };
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll();
    dispatch({
      type: 'GET_ALL_BLOGS',
      data: allBlogs,
    });
  };
};

export const changeBlogVis = (blog) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_BLOG_VISIBILITY',
      data: blog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
    dispatch({
      type: 'LIKE_BLOG',
      data: blog,
    });
  };
};
export default blogReducer;
