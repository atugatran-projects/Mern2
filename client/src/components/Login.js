import React from "react";

const Login = () => {
  return (
    <section className="container m-5 card">
      <h1>Log in</h1>
      <form>
        <div className="form-group row">
          <label htmlFor="emil" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              placeholder="123@gmail.com"
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
              name="password"
              id="password"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
