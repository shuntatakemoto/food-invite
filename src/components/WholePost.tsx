import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getPostId, getListName, selectPost } from "../features/postSlice";
interface PROPS {
  postId: string;
  avatar: string;
  listname: string;
  username: string;
  timestamp: any;
}

const WholePost: React.FC<PROPS> = (props) => {
  const post = useSelector(selectPost);
  const dispatch = useDispatch();
  const postid = props.postId;

  return (
    <div className="bg-gray-200 w-2/5 rounded-lg shadow-xl overflow-hidden m-5">
      <Link to="/detail" onClick={() => dispatch(getPostId(postid))}>
        <p>WholePost.tsx</p>
        <div className="">
          <img
            src={props.avatar}
            alt=""
            className="w-full rounded-lg rounded-b-none"
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-lg">{props.listname}</p>
          <p>{postid}</p>
        </div>
      </Link>
    </div>
  );
};

export default WholePost;
