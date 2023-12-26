import React from "react";
import { Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();

  const finishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/register", values);
      if (res.data.success) {
        message.success("Register Successful");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Register Failed!");
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={finishHandler} className="card px-4">
          <h1 className="text-center fs-1">Register Page</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary btn-lg" type="submit">
            Register
          </button>

          <Link to="/login" className="text-center m-3 fs-6">
            Already a user? login
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
