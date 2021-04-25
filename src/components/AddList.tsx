import React, { useState } from "react";
import firebase from "firebase/app";
import { storage, db, auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const AddList: React.FC = () => {
  const user = useSelector(selectUser);
  //   const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [listName, setListName] = useState("");

  //   リストにサムネイル画像をつける場合
  //   const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files![0]) {
  //       setUploadImage(e.target.files![0]);
  //       e.target.value = "";
  //     }
  //   };

  const addList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection(user.uid).add({
      //   image: "",
      avatar: user.photoUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      listname: listName,
    });
    setListName("");
  };

  return (
    <>
      <form onSubmit={addList} className="pl-5 ">
        <div>
          <div>
            <label>
              リスト名を入力
              <input
                className="mt-5 ml-10"
                placeholder="行きたい飲食店リスト"
                type="text"
                autoFocus
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mt-5">
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

export default AddList;
