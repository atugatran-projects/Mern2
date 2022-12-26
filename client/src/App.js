import React, { createContext, useReducer } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Logout from "./components/Logout";
import { initialState, reducer } from "./reducer/UseReeduces";

// 1. ContextAPI
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </>
  );
};

export default App;
// export { App, UserContext };
