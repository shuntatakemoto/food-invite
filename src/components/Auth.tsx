import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, provider, storage } from "../firebase";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const Auth: React.FC = () => {
  const signInTwitter = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="text-center bg-main-color flex justify-center items-center h-screen">
      <div className="bg-white pb-10 h-1/2 m-10">
        <p className="text-5xl p-10 font-bold">Sign In</p>
        <p className="m-5">
          サービスをご利用するにはTwitterでログインが必要です。
        </p>
        <button
          className="bg-sub-color p-2 mt-5 rounded-2xl text-center"
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
