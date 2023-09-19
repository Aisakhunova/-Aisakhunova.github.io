import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton.";
import { useContext } from "react";
import { AuthorisationContext } from "../../../context";

export default function Navbar() {
  const { isAuthorized, setIsAuthorized } = useContext(AuthorisationContext);
  const logout = () => {
    setIsAuthorized(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className="navbar">
      <MyButton onClick={logout}>Logout</MyButton>
      <div className="navbar__links">
        <Link to="/about">About Site</Link>
        <Link to="/posts">Site</Link>
      </div>
    </div>
  );
}
