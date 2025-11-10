import React, { useState } from "react";
import axios from "axios";
import "./App.css";

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
    <div className="app-container">
      <div className="form-wrapper">
        <h2 className="form-title">Login Form</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="button-group">
          <button onClick={register} className="btn btn-register">Register</button>
          <button onClick={login} className="btn btn-login">Login</button>
        </div>

        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}

export default App;
