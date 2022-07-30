import { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Card from './Card';
import Togglable from './Togglable';

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const blogFormToggalble = useRef();

  const handleCreateBlog = () => blogFormToggalble.current.toggleVisibility();

  return (
    <>
      <h2 className="text-xl">create</h2>
      <Togglable buttonLabel="new blog" ref={blogFormToggalble}>
        <BlogForm onCreate={handleCreateBlog} />
      </Togglable>
      <h2 className="text-xl mt-6 mb-3">browse</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Fragment key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <Card>
                  <div className="flex justify-between items-center gap-2">
                    <div>
                      <p className="font-serif">{blog.title}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {blog.author}
                      </p>
                    </div>
                    <p className="text-xl text-slate-400">{blog.likes}</p>
                  </div>
                </Card>
              </Link>
            </Fragment>
          ))}
      </div>
    </>
  );
};

export default Blogs;
