import { UserContext } from "../App";
import React, { useState, useContext } from "react";
const { useNavigate } = require("react-router-dom");

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { state, dispatch } = useContext(UserContext);
  const { dispatch } = useContext(UserContext);
  
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    if (!data || res.status === 400) {
      alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      alert("Login Successfully");
      Navigate("/about");
    }
  };
  return (
    <section className="container mt-5 pt-5 pb-5 pl-4 pr-4 card con">
      <h1>Log in</h1>
      <form method="POST">
        <div className="form-group row">
          <label htmlFor="emil" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              autoComplete="true"
              placeholder="123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              autoComplete="true"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={loginUser}
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
