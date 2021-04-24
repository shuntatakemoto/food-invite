import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color flex h-16 items-center">
      <Link to="/">
        <h3 className="px-4 text-2xl">Food Invite</h3>
      </Link>
      <Link to="/create-list">
        <LibraryAddIcon fontSize="large" />
      </Link>
    </div>
  );
};

export default Header;
