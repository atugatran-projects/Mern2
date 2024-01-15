import React, { useEffect, useState } from "react";
const { useNavigate } = require("react-router-dom");
let BackendURL = process.env.REACT_APP_BackendURL


const Contact = () => {
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const userContact = async () => {
    try {
      const res = await fetch(BackendURL+"/getData", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      Navigate("/login");
      // console.log("No Token Found");
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  //   We Are Storing Data in State
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  //   We Are Storing Data to Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data || !res.status === 201) {
      window.alert("Message not Sent");
    } else {
      window.alert("Message Sent");
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <section className="container mt-5 pt-5 pb-5 pl-4 pr-4 card">
        <h1>Contact us</h1>
        <form method="post">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={userData === undefined ? "" : userData.name}
                placeholder="Email"
                onChange={handleInput}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={userData === undefined ? "" : userData.email}
                className="form-control"
                id="email"
                name="email"
                placeholder="123@gmail.com"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              value={userData === undefined ? "" : userData.phone}
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="12345 - 67890"
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              placeholder="Enter The Message"
              onChange={handleInput}
              name="message"
              id="message"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
