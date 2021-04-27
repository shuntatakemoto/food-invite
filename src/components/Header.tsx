import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color flex h-16 items-center">
      <Link to="/">
        <h3 className="px-4 text-2xl mr-5">Food Invite</h3>
      </Link>
      {/* if文で現在のパスが/detailの時、Linkを/add-listに変更させる */}
      <Link to="/create-list" className="mr-5">
        <LibraryAddIcon fontSize="large" />
      </Link>
      <Link to="/bookmark">
        <BookmarkIcon fontSize="large" />
      </Link>
    </div>
  );
};

export default Header;
