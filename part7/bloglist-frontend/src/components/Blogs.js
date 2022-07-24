import { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = () => {
  const user = useSelector(({ auth }) => auth);
  const blogs = useSelector(({ blogs }) => blogs);
  const blogFormToggalble = useRef();

  const handleCreateBlog = () => blogFormToggalble.current.toggleVisibility();

  return (
    <>
      <h2>create</h2>
      <Togglable buttonLabel="new blog" ref={blogFormToggalble}>
        <BlogForm onCreate={handleCreateBlog} />
      </Togglable>
      <h2>browse</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog, index, { length }) => (
          <Fragment key={blog.id}>
            <Blog blog={blog} user={user} />
            {index !== length - 1 && <hr />}
          </Fragment>
        ))}
    </>
  );
};

export default Blogs;
