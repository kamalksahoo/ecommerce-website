import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer style={{justifyContent:"center"}}  className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-secondary text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <a href="tel:+91 8132922696" className="btn btn-warning btn-lg">Contact Us</a>
      </div>
      <div  className="container-fluid fixed-bottom bg-primary text-center ">
        <span  className="text-light">
          An Amazing E commerce Website <span className="text-white "> by kamal kant</span> 
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
