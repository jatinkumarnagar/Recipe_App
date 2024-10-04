import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [_, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Login"}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default AuthLogin;
