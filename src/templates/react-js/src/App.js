import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AUTHENTICATED_ROUTE,
  PUBLIC_ROUTE,
  UNAUTHENTICATED_ROUTE,
} from "./utils/constants/routes";
import {
  AuthenticatedRoute,
  PublicRoute,
  UnauthenticatedRoute,
} from "./utils/routes";

function App() {
  return (
    <div className="App">
      <Routes>
        {PUBLIC_ROUTE.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                <PublicRoute>
                  <route.element />
                </PublicRoute>
              }
              key={route.id}
            />
          );
        })}
        {AUTHENTICATED_ROUTE.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                <AuthenticatedRoute redirectURL="/unauthenticated">
                  <route.element />
                </AuthenticatedRoute>
              }
              key={route.id}
            />
          );
        })}
        {UNAUTHENTICATED_ROUTE.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                <UnauthenticatedRoute redirectURL="/authenticated">
                  <route.element />
                </UnauthenticatedRoute>
              }
              key={route.id}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
