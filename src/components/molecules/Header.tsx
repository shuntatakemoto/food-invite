import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Emoji } from "emoji-mart";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const createLink = `${user.uid}/create-list`;

  return (
    <div className="bg-sub-color flex h-16 items-center justify-center">
      <Link to="/">
        <h3 className="px-4 text-2xl">Food Invite</h3>
      </Link>

      {user.uid ? (
        <Link to={createLink} className="mr-5 ml-5">
          <LibraryAddIcon fontSize="large" />
        </Link>
      ) : (
        <div className="mr-5 ml-5">
          <Emoji emoji="knife_fork_plate" size={32} />
        </div>
      )}

      {user.uid ? (
        <Link to="/bookmark">
          <BookmarkIcon fontSize="large" />
        </Link>
      ) : (
        <div className="mr-5">
          <Emoji emoji="yum" size={32} />
        </div>
      )}
    </div>
  );
};

export default Header;
