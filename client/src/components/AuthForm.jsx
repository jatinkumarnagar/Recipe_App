import React from "react";
import AuthContainer from "./AuthContainer";
import { FaUserCircle } from "react-icons/fa";

const AuthForm = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div>
      <AuthContainer>
        <FaUserCircle className="fs-1" />
        <form onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="username">
              User Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="form-control border border-black shadow-sm"
              placeholder="Enter Username Here"
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="form-control border border-black shadow-sm"
              placeholder="Enter Password Here"
              required
            />
            <p style={{ fontSize: "12px" }}>
              Term & Condition and Privacy Policy.
            </p>
          </div>
          <button type="submit" className="btn btn-success mt-2">
            {label}
          </button>
        </form>
      </AuthContainer>
    </div>
  );
};

export default AuthForm;
