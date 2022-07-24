import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../services/users';

const User = () => {
  const { id } = useParams();
  const { user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.find((user) => user.id === id),
    }),
  });

  return (
    <>
      <h2>{user?.name}</h2>
      <h3>blogs</h3>
      <ul>
        {user?.blogs?.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      {(!user?.blogs?.length ?? true) && <p>no blogs to display</p>}
    </>
  );
};

export default User;
