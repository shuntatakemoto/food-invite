import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";

interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

const Post: React.FC<PROPS> = (props) => {
  // const user = useSelector(selectUser);
  return (
    <div>
      <div>
        <Avatar src={props.avatar} />
      </div>
      <div>
        <span>{props.username}</span>
        <span>{new Date(props.timestamp?.toDate()).toLocaleString()}</span>
      </div>
      <div>
        <p>{props.text}</p>
      </div>
      {props.image && (
        <div>
          <img src={props.image} alt="list" />
        </div>
      )}
    </div>
  );
};

export default Post;
