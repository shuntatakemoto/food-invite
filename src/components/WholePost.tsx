import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import { selectUser } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostId, getListName, selectPost } from "../features/postSlice";
import { Emoji } from "emoji-mart";
interface PROPS {
  postId: string;
  // avatar: string;
  listname: string;
  username: string;
  timestamp: any;
}

const WholePost: React.FC<PROPS> = (props) => {
  const post = useSelector(selectPost);
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-200 w-2/5 rounded-lg shadow-xl overflow-hidden m-5 h-48">
      <Link
        to="/detail"
        onClick={() => {
          dispatch(getPostId(props.postId));
          dispatch(getListName(props.listname));
        }}
      >
        <div className="h-2/3 text-center pt-2">
          <p>WholePost.tsx</p>
          {/* <img
            src={props.avatar}
            alt=""
            className="w-full rounded-lg rounded-b-none"
          /> */}
          <Emoji emoji="thinking_face" size={64} />
        </div>
        <div className="text-center h-1/3">
          <p className="text-base">{props.listname}</p>
          {/* <p>{props.postId}</p> */}
        </div>
      </Link>
    </div>
  );
};

export default WholePost;
