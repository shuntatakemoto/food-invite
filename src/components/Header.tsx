import React, { useState } from "react";
import { auth } from "../firebase";
import LockIcon from "@material-ui/icons/Lock";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color">
      <h3>Food Invite</h3>
      <Link to="/create-list">
        <button>+</button>
      </Link>
    </div>
  );
};

export default Header;
