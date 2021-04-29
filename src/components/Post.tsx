import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  username: string;
  timestamp: any;
  name: string;
}

const Post: React.FC<PROPS> = (props) => {
  // const user = useSelector(selectUser);
  // const [name, setName] = useState("");
  // const [memo, setMemo] = useState("");
  // const [url, setUrl] = useState("");

  // const newRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   db.collection(user.uid).doc(props.postId).collection("restaurant").add({
  //     name: name,
  //     memo: memo,
  //     url: url,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     username: user.displayName,
  //   });
  //   setName("");
  //   setMemo("");
  //   setUrl("");
  // };

  return (
    <div className="bg-gray-200 w-2/5 rounded-lg shadow-xl overflow-hidden m-5">
      <Link to="/detail">
        {/* <a className=""> */}
        <div className="">
          <img
            src={props.avatar}
            alt=""
            className="w-full rounded-lg rounded-b-none"
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-lg">{props.name}</p>
          <p>{props.postId}</p>
          {/* <p>{props.listname}</p> */}
        </div>
        {/* </a> */}
      </Link>
    </div>
  );
};

export default Post;
