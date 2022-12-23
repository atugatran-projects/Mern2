import React, { useState } from "react";
import { unstable_HistoryRouter } from "react-router-dom";
const Signup = () => {
  const History = unstable_HistoryRouter;
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
    const {name, email, phone, password, cpassword} = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.log(data);
    if (!data || res.status === 422) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("User Registration Successfully");
      console.log("User Registration Successfully");
      History.push("/login");
    }
  };
  return (
    <section className="container m-5">
      <form method="POST" action="/register">
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