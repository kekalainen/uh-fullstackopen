import { useState } from 'react';

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'collapse' : 'expand'}
        </button>
      </div>
      {expanded && (
        <>
          <a target="_blank" rel="noreferrer" href={blog.url}>
            {blog.url}
          </a>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
