import React, { useEffect, useContext } from "react";
import { UserContext } from "../App";
const { useNavigate } = require("react-router-dom");

const Logout = () => {
  const Navigate = useNavigate();
  // const {state, dispatch} = useContext(UserContext)
  const { dispatch } = useContext(UserContext);
  // Proises
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        Navigate("/login");
        dispatch({ type: "USER", payload: false });
        if (response.status !== 200) {
          const error = new Error(response.error);
          throw error;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, Navigate]);
  return (
    <>
      <h1>Logout Ka Page</h1>
    </>
  );
};

export default Logout;
