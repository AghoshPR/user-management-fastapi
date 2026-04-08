import { useState, useEffect } from "react";
import {
  getUsersAPI,
  deleteUserAPI,
  toggleUserAPI,
} from "../../features/auth/authAPI";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsersAPI();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUserAPI(id);
  };

  const handleToggle = async (id) => {
    await toggleUserAPI(id);
    fetchUsers();
  };

  return (
    <>
      <h1>Admin Dashboard</h1>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.is_active ? "Active" : "Blocked"}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
                <button onClick={() => handleToggle(u.id)}>
                  {u.is_active ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
