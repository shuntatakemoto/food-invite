import React, { useState } from "react";
import firebase from "firebase/app";
import { storage, db, auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useHistory } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import TextField from "@material-ui/core/TextField";

const CreateList: React.FC = () => {
  const user = useSelector(selectUser);
  const [listName, setListName] = useState("");
  const [emojiName, setEmojiName] = useState("");
  const history = useHistory();
  const newEmojiName = emojiName.replace(/\"/g, "");
  const createList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection(user.uid).add({
      avatar: user.photoUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      listname: listName,
      emojiname: newEmojiName,
    });
    setListName("");
    setEmojiName("");
    history.push("/");
  };

  return (
    <>
      <h3>リストを作成</h3>
      <form onSubmit={createList} className="pl-5 flex-1">
        <TextField
          label="リスト名"
          placeholder="行きたい飲食店リスト"
          multiline
          fullWidth
          margin="normal"
          value={listName}
          className="pr-5 mb-5"
          onChange={(e) => setListName(e.target.value)}
        />

        <div className="mb-5">
          <p className="pb-5">絵文字を設定</p>
          <Picker
            set="twitter"
            onSelect={(emoji) => setEmojiName(JSON.stringify(emoji.id))}
          />
          {/* {console.log(emojiName.replace(/\"/g, ""))} */}
        </div>
        <div className="mb-5">
          <button
            type="submit"
            disabled={!listName}
            className={
              listName
                ? "bg-sub-color p-2 rounded-2xl mb-5"
                : "text-gray-300 p-2 rounded-2xl mb-5"
            }
          >
            リスト作成
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateList;
