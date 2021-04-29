import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

interface PROPS {
  postId: string;
  avatar: string;
  listname: string;
  username: string;
  timestamp: any;
}

const WholePost: React.FC<PROPS> = (props) => {
  // const user = useSelector(selectUser);
  return (
    <div className="bg-gray-200 w-2/5 rounded-lg shadow-xl overflow-hidden m-5">
      <Link to="/detail">
        <div className="">
          <img
            src={props.avatar}
            alt=""
            className="w-full rounded-lg rounded-b-none"
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-lg">{props.listname}</p>
          <p>{props.postId}</p>
        </div>
      </Link>
    </div>
  );
};

export default WholePost;
