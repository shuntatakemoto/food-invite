import React, { useState } from "react";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Footer: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color">
      <Link to="/">
        <p>Home</p>
      </Link>
      <button onClick={() => auth.signOut()} className="">
        Logout
      </button>
    </div>
  );
};

export default Footer;
