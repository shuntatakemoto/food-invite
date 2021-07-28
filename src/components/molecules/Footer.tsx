import React from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";
import { Emoji } from "emoji-mart";

const Footer: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color flex h-16 items-center justify-evenly">
      {user.uid ? (
        <Link to="/">
          <p className="text-xl">Home</p>
        </Link>
      ) : (
        <div className="">
          <Emoji emoji="partying_face" size={32} />
        </div>
      )}

      {user.uid ? (
        <button onClick={() => auth.signOut()} className="text-xl">
          Logout
        </button>
      ) : (
        <div className="">
          <Emoji emoji="drooling_face" size={32} />
        </div>
      )}
    </div>
  );
};

export default Footer;
