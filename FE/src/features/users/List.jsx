import { useEffect, useState } from 'react';
import {UserService} from '../../_service/userService'

export { List };

function List() {
  const [users, setUsers] = useState(null);
  

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const usersData = await UserService.getAll();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  return (
    <div>
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Name</th>
            <th style={{ width: '30%' }}>Email</th>
            <th style={{ width: '10%' }}>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.user_type}</td>
              <td style={{ whiteSpace: 'nowrap' }}></td>
            </tr>
          ))}
          {users?.loading && (
            <tr>
              <td colSpan="3" className="text-center">
                <span className="spinner-border spinner-border-lg align-center"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
