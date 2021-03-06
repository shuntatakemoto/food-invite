import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getPostId,
  getListName,
  getEmojiName,
  selectPost,
} from "../../features/postSlice";
import { Emoji } from "emoji-mart";
import { useParams } from "react-router-dom";
interface PROPS {
  postId: string;
  // avatar: string;
  listname: string;
  username: string;
  timestamp: any;
  emojiname: string;
}

const WholePost: React.FC<PROPS> = (props) => {
  const dispatch = useDispatch();
  const emojiName = props.emojiname;
  //ダブルクオテーションを削除している
  const newEmojiName = emojiName.replace(/\"/g, "");
  const params = useParams<{ uid: string }>();
  const uid = params.uid;

  return (
    <div className=" rounded-lg shadow-xl overflow-hidden h-48 xl:h-60 m-4 xl:m-6">
      <Link
        to={`${uid}/${props.postId}`}
        onClick={() => {
          dispatch(getPostId(props.postId));
          dispatch(getListName(props.listname));
          dispatch(getEmojiName(props.emojiname));
        }}
      >
        <div className="h-36 xl:h-48 grid justify-items-center items-center bg-gray-200">
          <Emoji emoji={newEmojiName} size={64} set="twitter" />
        </div>
        <div className="text-center h-12 xl:h-12 grid justify-items-center items-center bg-gray-200">
          <p className="text-base">{props.listname}</p>
        </div>
      </Link>
    </div>
  );
};

export default WholePost;
