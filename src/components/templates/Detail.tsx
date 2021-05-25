import React from "react";
import MyList from "../organisms/MyList";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPost } from "../../features/postSlice";
import { selectUser } from "../../features/userSlice";
import { Emoji } from "emoji-mart";
import Button from "../atoms/Button";
interface PROPS {
  postId: string;
  avatar: string;
  listname: string;
  username: string;
  timestamp: any;
  emojiname: string;
}
const Detail: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser);
  const storeEmojiName = useSelector(selectPost);
  const newEmojiName = storeEmojiName.emojiName.replace(/\"/g, "");

  return (
    <div className="flex-1">
      <p>Detail.tsx</p>
      <div className="flex">
        <div className="w-8 mr-5">
          <img
            src={user.photoUrl.replace("normal", "200x200")}
            alt="profile image"
            className="w-40"
          />
        </div>
        <p>Created by {user.displayName}</p>
      </div>
      <div>
        <div className="text-center py-5">
          <Emoji emoji={newEmojiName} size={64} set="twitter" />
        </div>
        <h3 className="text-3xl text-center">{storeEmojiName.listName}</h3>
        <Button
          buttonText="&emsp;&emsp;店を追加する&emsp;&emsp;"
          buttonLink="./add-List"
        />
        <Button buttonText="このリストを保存する" buttonLink="./add-List" />
        <Button buttonText="このリストを削除する" buttonLink="./add-List" />
      </div>
      <MyList />
    </div>
  );
};

export default Detail;
