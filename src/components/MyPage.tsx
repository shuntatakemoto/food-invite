import React, { useState } from "react";
import { auth } from "../firebase";
import LockIcon from "@material-ui/icons/Lock";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const MyPage: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="">
      <img
        src={user.photoUrl.replace("normal", "200x200")}
        alt="profile image"
        className="w-40"
      />
      <p className="text-xl font-bold">{user.displayName}</p>
      <Link to="/create-list">
        <div>
          <button>行きたい飲食店リスト</button>
        </div>
      </Link>
      <Link to="/create-list">
        <div>
          <button>お気に入り飲食店リスト</button>
        </div>
      </Link>
      <Link to="/create-list">
        <div>
          <button>その他のリスト</button>
        </div>
      </Link>
      <button
        onClick={() => auth.signOut()}
        className="bg-yellow-100 p-2 rounded-2xl"
      >
        <LockIcon />
        Logout
      </button>
    </div>
  );
};

export default MyPage;
