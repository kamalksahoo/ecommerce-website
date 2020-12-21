import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";

const UserDashBoard = () => {
  const {
    user: { name, email }
  } = isAutheticated();

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

          <li  style={{textAlign:"end"}}  className="list-group-item ">
            <span className="badge badge-danger">user</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to user area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div style={{justifyContent:"center"}} className="row">
        <div className="col-8">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
