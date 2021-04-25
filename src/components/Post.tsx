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
  image: string;
  username: string;
  timestamp: any;
}

const WholePost: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const newRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection(user.uid).doc(props.postId).collection("restaurant").add({
      name: name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setName("");
  };
  return (
    <div className="bg-gray-200 w-2/5 rounded-lg shadow-xl overflow-hidden m-5">
      <form onSubmit={newRestaurant}>
        <div>
          <input
            className=""
            type="text"
            placeholder="Type new comment..."
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
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
            <SendIcon className="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default WholePost;
