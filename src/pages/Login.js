import React from "react";
import { Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

const Login = () => {
  const navigate = useNavigate();

  const finishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/login", values);
      if (res.data.success) {
        localStorage.setItem("userEmail", res.data.data.email);
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Login Failed!");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={finishHandler} className="card px-4">
          <h1 className="text-center fs-1 mb-3">Login Page</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary btn-lg" type="submit">
            Login
          </button>

          <Link to="/register" className="text-center m-3 fs-6">
            New user? register
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Login;
