import { useGetUsersQuery } from '../services/users';

const Users = () => {
  const { data: users } = useGetUsersQuery();

  return (
    <>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
