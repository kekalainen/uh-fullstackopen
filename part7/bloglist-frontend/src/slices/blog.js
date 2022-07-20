import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog: (state, { payload }) => state.concat(payload),
    setBlogs: (_state, { payload }) => payload,
  },
});

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (payload, user) => async (dispatch) => {
  const blog = await blogService.create(payload);
  dispatch(
    appendBlog({
      ...blog,
      user: { id: blog.user, username: user.username, name: user.name },
    })
  );
};

export const likeBlog = (payload) => async (dispatch, getState) => {
  const { id, likes } = await blogService.like(payload);
  const { blogs } = getState();
  dispatch(
    setBlogs(blogs.map((blog) => (blog.id === id ? { ...blog, likes } : blog)))
  );
};

export const deleteBlog = ({ id }) => {
  return async (dispatch, getState) => {
    await blogService.delete(id);
    const { blogs } = getState();
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
  };
};

export const { appendBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
