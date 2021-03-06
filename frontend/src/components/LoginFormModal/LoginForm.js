import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";

import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h1 className="auth-title">Log in to Clevernote:</h1>
      <ul className="errorsAuth">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
      <label className="line">
        Username or Email
        <input
          className="auth-form-input"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email..."
        />
      </label>
      <label className="line">
        Password
        <input
          className="auth-form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password..."
        />
      </label>
      <button
        className="loginButton"
        type="submit"
      >
        Sign In
      </button>
    </form >
  );
}

export default LoginForm;
