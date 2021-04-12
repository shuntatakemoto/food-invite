import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, provider, storage } from "../firebase";

// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Paper,
//   Grid,
//   Typography,
//   makeStyles,
//   Modal,
//   IconButton,
//   Box,
// } from "@material-ui/core";

// import SendIcon from "@material-ui/icons/Send";
// import CameraIcon from "@material-ui/icons/Camera";
// import EmailIcon from "@material-ui/icons/Email";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import LockOpenIcon from "@material-ui/icons/LockOpen";

const Auth: React.FC = () => {
  const signInTwitter = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="text-center bg-yellow-100 flex justify-center items-center h-screen">
      <div className="bg-white pb-10 h-2/4 m-10">
        <p className="text-5xl p-10 font-bold">Sign In</p>
        <p className="m-5">
          サービスをご利用するにはTwitterでログインが必要です。
        </p>
        <button
          className="bg-yellow-100 p-2 mt-5 rounded-2xl text-center"
          onClick={signInTwitter}
        >
          <LockOpenIcon />
          Sign In with Twitter
        </button>
      </div>
    </div>
  );
};

export default Auth;
