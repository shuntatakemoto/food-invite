import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import firebase from "firebase/app";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  selectItem,
  getName,
  getPostId,
  getMemo,
  getUrl,
  getUserName,
  getImageUrl,
} from "../../features/itemSlice";
import { useHistory, useParams } from "react-router-dom";
interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  username: string;
  timestamp: any;
  name: string;
  listname: string;
  memo: string;
  url: string;
  imageurl: string;
}

const Post: React.FC<PROPS> = (props) => {
  const post = useSelector(selectItem);
  const dispatch = useDispatch();
  const params = useParams() as any;
  const ItemId = params.id as string;

  return (
    <div className="bg-gray-200 w-2/5 rounded-lg shadow-xl overflow-hidden m-4">
      <p>Post.tsx</p>
      <Link
        to={`/restaurants/${props.postId}`}
        onClick={() => {
          dispatch(getName(props.name));
          dispatch(getPostId(props.postId));
          dispatch(getMemo(props.memo));
          dispatch(getUrl(props.url));
          dispatch(getUserName(props.username));
          dispatch(getImageUrl(props.imageurl));
        }}
      >
        <div className="">
          <img
            src={props.avatar}
            alt=""
            className="w-full rounded-lg rounded-b-none"
          />
        </div>
        <div className="p-4 text-center">
          <p>{props.name}</p>
          {/* <p>{props.postId}</p>
          <p>{props.memo}</p>
          <p>{props.url}</p>
          <p>{props.username}</p>
          <img src={props.imageurl} alt="" className="w-4 rounded-3xl" /> */}
        </div>
      </Link>
    </div>
  );
};

export default Post;
