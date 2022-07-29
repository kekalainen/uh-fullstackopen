import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogCommentForm from './BlogCommentForm';

const BlogComments = () => {
  const { id } = useParams();
  const { comments } = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === id)
  );

  return (
    <>
      <h3>comments</h3>
      <BlogCommentForm id={id} />
      <ul>
        {comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      {!comments?.length && <p>no comments to display</p>}
    </>
  );
};

export default BlogComments;
