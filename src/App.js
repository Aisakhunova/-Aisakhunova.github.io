import React, { useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthorisationContext } from "./context";
import { useState } from "react";
function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuthorized("true");
    }
  }, []);
  return (
    <AuthorisationContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthorisationContext.Provider>
  );
}

export default App;
