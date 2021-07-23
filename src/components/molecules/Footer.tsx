import React from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";
import { Emoji } from "emoji-mart";

const Footer: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-sub-color flex h-16 items-center justify-center">
      {user.uid ? (
        <Link to="/">
          <p className="px-4 text-xl mr-3">Home</p>
        </Link>
      ) : (
        <div className="mr-5">
          <Emoji emoji="partying_face" size={32} />
        </div>
      )}

      {user.uid ? (
        <button onClick={() => auth.signOut()} className="px-4 text-xl ml-3">
          Logout
        </button>
      ) : (
        <div className="ml-5">
          <Emoji emoji="drooling_face" size={32} />
        </div>
      )}
    </div>
  );
};

export default Footer;
