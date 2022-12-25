import React, { useEffect, useState } from "react";
const { useNavigate } = require("react-router-dom");

const About = () => {
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({});
  // console.log(userData);
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
        // Navigate("/");
      }
    } catch (error) {
      console.log("No Token Found");
      Navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <section className="card m-4 p-4">
        <form method="GET">
          <h1>Account Info</h1>
          <div className="profile_info">
            <p>
              <strong>Id =) </strong>
              {userData === undefined ? "3524634613461436437374" : userData._id}
            </p>
            <p>
              <strong>Name  =) </strong>
              {userData === undefined ? "Name" : userData.name}
            </p>
            <p>
              <strong>Email =) </strong>
              {userData === undefined ? "123@gmail.com" : userData.email}
            </p>
            <p>
              <strong>Phone =) </strong>
              {userData === undefined ? "1234567890" : userData.phone}
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default About;