import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // 📝 Register function
  const register = async () => {
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        age,
        password,
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.error || "Server error"));
    }
  };

  // 🔑 Login function
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        name,
        password,
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h2>Login Form</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>

      <p>{msg}</p>
    </div>
  );
}

export default App;
