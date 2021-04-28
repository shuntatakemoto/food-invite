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
}

const Post: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [url, setUrl] = useState("");

  const newRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection(user.uid).doc(props.postId).collection("restaurant").add({
      name: name,
      memo: memo,
      url: url,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setName("");
    setMemo("");
    setUrl("");
  };
  return (
    <div className="">
      <form onSubmit={newRestaurant}>
        <div>
          <input
            className=""
            type="text"
            placeholder="店名"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <input
            className=""
            type="text"
            placeholder="店情報のURL"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          <input
            className=""
            type="text"
            placeholder="一言メモ"
            value={memo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMemo(e.target.value)
            }
          />
          <button
            disabled={!name}
            className={
              name
                ? "bg-sub-color p-2 rounded-2xl mb-5"
                : "text-gray-300 p-2 rounded-2xl mb-5"
            }
            type="submit"
          >
            <CheckCircleIcon fontSize="large" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
