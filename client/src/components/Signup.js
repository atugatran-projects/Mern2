import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
let BackendURL = process.env.REACT_APP_BackendURL

const Signup = () => {
  const Navigate = useNavigate;
  // Get Data of Form
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleinput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // Post Data to Database
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    const res = await fetch(BackendURL+"/register", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    const data = res.json();
    // console.log(data);
    if (!data) {
      window.alert("Invalid Credentials");
      // console.log("Invalid Credentials");
    } else if (res.status === 422) {
      window.alert("Already User Signup");
      // console.log("Already User Signup");
    } else {
      window.alert("User Registration Successfully");
      // console.log("User Registration Successfully");
      Navigate("/login");
    }
  };
  return (
    <section className="container mt-5 pb-3 card">
      <h1>Register</h1>
      <form method="POST">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              required
              value={user.name}
              onChange={handleinput}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="123@gmail.com"
              name="email"
              id="email"
              value={user.email}
              onChange={handleinput}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone No</label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="12345-67890"
            value={user.phone}
            onChange={handleinput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="true"
            placeholder="Enter Your Password"
            value={user.password}
            onChange={handleinput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Conform Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            autoComplete="true"
            name="cpassword"
            placeholder="Enter Your Password"
            value={user.cpassword}
            onChange={handleinput}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={postData}>
          Register
        </button>
      </form>
    </section>
  );
};

export default Signup;
