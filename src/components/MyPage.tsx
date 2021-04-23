import React, { useState } from "react";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import MyList from "../components/MyList";

const MyPage: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-main-color">
      <img
        src={user.photoUrl.replace("normal", "200x200")}
        alt="profile image"
        className="w-40"
      />
      <p className="text-xl font-bold">{user.displayName}</p>
      <MyList />
    </div>
  );
};

export default MyPage;
