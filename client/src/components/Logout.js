import React, { useEffect } from "react";
const { useNavigate } = require("react-router-dom");

const Logout = () => {
  const Navigate = useNavigate();
  // Proises
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        Navigate("/login");
        if (response.status != 200) {
          const error = new Error(response.error);
          throw error;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <h1>Logout Ka Page</h1>
    </>
  );
};

export default Logout;
