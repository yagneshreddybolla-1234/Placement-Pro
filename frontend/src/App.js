import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8080/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    if (isLoggedIn) fetchUsers();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return page === "login" ? (
      <Login setIsLoggedIn={setIsLoggedIn} goToSignup={() => setPage("signup")} />
    ) : (
      <Signup goToLogin={() => setPage("login")} />
    );
  }

  return (
    <div className="App">
      <h1 className="main-title">Placement Management System</h1>
      <h3 className="sub-title">User Entity Module</h3>

      <button onClick={() => setIsLoggedIn(false)}>Logout</button>

      <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />

      <UserList users={users} fetchUsers={fetchUsers} setEditingUser={setEditingUser} />
    </div>
  );
}

export default App;