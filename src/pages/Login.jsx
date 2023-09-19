import React from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton.";
import { useContext } from "react";
import { AuthorisationContext } from "../context";

export default function Login() {
  const { isAuthprized, setIsAuthorized } = useContext(AuthorisationContext);
  const login = (e) => {
    e.preventDefault();
    setIsAuthorized(true);
    localStorage.setItem("auth", "true");
  };
  return (
    <div>
      <h1>Page for login</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Enter login"></MyInput>
        <MyInput type="password" placeholder="Enter password"></MyInput>
        <MyButton>Login</MyButton>
      </form>
    </div>
  );
}
