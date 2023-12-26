import React, { useState } from "react";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge } from "antd";
import Model from "../Model";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";
const Navbar = () => {
  // Logout
  const navigate = useNavigate();
  const logoutClickHandler = () => {
    localStorage.clear();
  };

  const [cartView, setCartView] = useState(false);

  const data = useCart();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow"
        aria-label="Ninth navbar example"
      >
        <div className="container-xl">
          <Link className="navbar-brand fs-2" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample07XL"
            aria-controls="navbarsExample07XL"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample07XL">
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/about">
                  About
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link className="nav-link " to="/myOrders">
                    My Orders
                  </Link>
                </li>
              ) : (
                " "
              )}
            </ul>
            <div className="d-flex ">
              {localStorage.getItem("token") ? (
                <>
                  <Badge count={data.length}>
                    <div
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => {
                        setCartView(true);
                      }}
                    >
                      My Cart {/* <Avatar shape="circle" size="small" /> */}
                    </div>
                  </Badge>

                  {cartView ? (
                    <Model onClose={() => setCartView(false)}>
                      <Cart />
                    </Model>
                  ) : null}

                  <Link
                    className="btn btn-sm btn-warning text-white mx-3"
                    onClick={logoutClickHandler}
                    to="/login"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link className="btn btn-sm btn-warning me-3" to="/login">
                    Login
                  </Link>

                  <Link
                    className="btn btn-sm btn-outline-warning mx-1"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
