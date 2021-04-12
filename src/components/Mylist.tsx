import React from "react";
import { auth } from "../firebase";
import LockIcon from "@material-ui/icons/Lock";

const Mylist: React.FC = () => {
  return (
    <div className="text-center">
      <button
        onClick={() => auth.signOut()}
        className="bg-yellow-100 p-2 rounded-2xl"
      >
        <LockIcon />
        Logout
      </button>
    </div>
  );
};

export default Mylist;
