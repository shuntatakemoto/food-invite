import React, { useState } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Footer: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color flex h-16 items-center justify-center">
      <Link to="/">
        <p className="px-4 text-xl mr-3">Home</p>
      </Link>
      <button onClick={() => auth.signOut()} className="px-4 text-xl ml-3">
        Logout
      </button>
    </div>
  );
};

export default Footer;