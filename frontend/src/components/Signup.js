import React, { useState } from "react";

function Signup({ goToLogin }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    if (!name || !type || !password) {
      setMsg("All fields required");
      return;
    }

    await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.trim(), type, password }),
    });

    setMsg("Signup successful! Now login");
  };

  return (
    <div className="login-container">
      <h1 className="main-title">Placement Management System</h1>
      <h3 className="sub-title">User Signup</h3>

      <input placeholder="Username" onChange={(e) => setName(e.target.value)} />

      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Select Role</option>
        <option value="ADMIN">ADMIN</option>
        <option value="STUDENT">STUDENT</option>
      </select>

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleSignup}>Sign Up</button>

      {msg && <p className="success">{msg}</p>}

      <p className="switch">
        Already have account? <span onClick={goToLogin}>Login</span>
      </p>
    </div>
  );
}

export default Signup;