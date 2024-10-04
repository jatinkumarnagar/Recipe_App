import React, { useState } from "react";
import axios from "axios";

import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/auth/register", { username, password });
      alert("Registration Completed! Now Login.");

      setUsername("");
      setPassword("");
    } catch (error) {
      alert('Registration Failed! try again.')
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
        label={"Register"}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Auth;
