import React from "react";
import { Route, Routes } from "react-router-dom";

import { privateRoutes, publicRoutes } from "../router/routes";

import { useContext } from "react";
import { AuthorisationContext } from "../context";

export default function AppRouter() {
  const { isAuthorized, setIsAuthorized } = useContext(AuthorisationContext);
  return (
    <div>
      {isAuthorized ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route
              Component={route.component}
              path={route.path}
              exact={route.exact}
              key={route.path}
            />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              Component={route.component}
              path={route.path}
              exact={route.exact}
              key={route.path}
            />
          ))}
        </Routes>
      )}
    </div>
  );
}
