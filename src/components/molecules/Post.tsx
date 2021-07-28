import React from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import {
  selectItem,
  getName,
  getPostId,
  getMemo,
  getUrl,
  getUserName,
  getImageUrl,
} from "../../features/itemSlice";
interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  username: string;
  timestamp: any;
  name: string;
  listname: string;
  memo: string;
  url: string;
  imageurl: string;
}

const Post: React.FC<PROPS> = (props) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  return (
    <>
      <Link
        to={`${match.url}/restaurants/${props.postId}`}
        onClick={() => {
          dispatch(getName(props.name));
          dispatch(getPostId(props.postId));
          dispatch(getMemo(props.memo));
          dispatch(getUrl(props.url));
          dispatch(getUserName(props.username));
          dispatch(getImageUrl(props.imageurl));
        }}
      >
        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden h-48 xl:h-60 m-4 xl:m-6">
          <div className="">
            <img
              src={props.imageurl}
              alt=""
              className="h-36 xl:h-48 w-full object-cover"
            />
          </div>
          <div className="grid justify-items-center items-center p-1 xl:p-4 text-center h-12 xl:h-12">
            <p>{props.name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
