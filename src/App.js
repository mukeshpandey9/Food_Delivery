import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./pages/Cart";
import MyOrder from "./pages/MyOrder";
function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
            <Route
              exact
              path="/myOrders"
              element={
                <ProtectedRoutes>
                  <MyOrder />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
