import React from "react";
import { useDispatch } from "react-redux";
import { userSignup } from "../../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await dispatch(userSignup(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/user/login");
    } else {
      setError(res.payload?.detail || "Signup failed");
    }
  };

  return (
    <>
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Signup</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p
        style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/user/login")}
      >
        Already have an account? Login
      </p>
    </>
  );
};

export default UserSignup;
