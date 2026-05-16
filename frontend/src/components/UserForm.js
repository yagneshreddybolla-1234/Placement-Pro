import React, { useState, useEffect } from "react";

const UserForm = ({ fetchUsers, editingUser, setEditingUser }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setType(editingUser.type);
      setPassword(editingUser.password);
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name: name.trim(), type, password };

    if (editingUser) {
      await fetch(`http://localhost:8080/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } else {
      await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    }

    fetchUsers();
    setEditingUser(null);
    setName("");
    setType("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />

      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select Type</option>
        <option value="ADMIN">ADMIN</option>
        <option value="STUDENT">STUDENT</option>
      </select>

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

      <button type="submit">{editingUser ? "Update" : "Add User"}</button>
    </form>
  );
};

export default UserForm;