import { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = () => {
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
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            {index !== length - 1 && <hr />}
          </Fragment>
        ))}
    </>
  );
};

export default Blogs;
