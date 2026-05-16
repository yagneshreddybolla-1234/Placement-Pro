import React from "react";

const UserList = ({ users, fetchUsers, setEditingUser }) => {
  const deleteUser = async (id) => {
    await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  return (
    <div>
      <h2>User List</h2>

      {users.map((u) => (
        <div key={u.id} className="user-item">
          <span>{u.name} ({u.type.toUpperCase()})</span>

          <div>
            <button onClick={() => setEditingUser(u)}>Edit</button>
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;