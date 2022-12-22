import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <section className="dflex">
      <main role="main" className="inner cover">
        <h1 className="cover-heading">Mern2 Project.</h1>
        <p className="lead">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum fuga nostrum inventore quae corporis accusamus voluptate itaque eligendi voluptates, nam placeat labore id laudantium numquam adipisci soluta blanditiis cumque reprehenderit.
        </p>
        <p className="lead">
          <Link to="/signup" className="btn btn-lg btn-secondary">
           Signup
          </Link>
        </p>
      </main>
      </section>
    </>
  );
};

export default Home;
