import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color flex h-16 items-center">
      <h3 className="px-4">Food Invite</h3>
      <Link to="/create-list">
        <button className="px-4">+</button>
      </Link>
    </div>
  );
};

export default Header;
