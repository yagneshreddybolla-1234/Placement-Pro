import React, { useState } from "react";

function Login({ setIsLoggedIn, goToSignup }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!name || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim(), password }),
      });

      if (!res.ok) {
        setError("Username or password incorrect");
        return;
      }

      const data = await res.json();

      if (data) {
        setError("");
        setIsLoggedIn(true);
      } else {
        setError("Username or password incorrect");
      }
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <div className="login-container">
      <h1 className="main-title">Placement Management System</h1>
      <h3 className="sub-title">User Module</h3>

      <input placeholder="Username" onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>

      {error && <p className="error">{error}</p>}

      <p className="switch">
        Don’t have an account? <span onClick={goToSignup}>Sign up</span>
      </p>
    </div>
  );
}

export default Login;