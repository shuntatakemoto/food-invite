import React, { useState } from "react";
import firebase from "firebase/app";
import { storage, db, auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar, IconButton } from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const CreateList: React.FC = () => {
  const user = useSelector(selectUser);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [uploadText, setUploadText] = useState("");
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setUploadImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const createList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + uploadImage.name;
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(uploadImage);
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection(user.uid).add({
                avatar: user.photoUrl,
                image: url,
                text: uploadText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
              });
            });
        }
      );
    } else {
      db.collection(user.uid).add({
        avatar: user.photoUrl,
        image: "",
        text: uploadText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      });
    }
    setUploadImage(null);
    setUploadText("");
  };
  return (
    <>
      <form onSubmit={createList}>
        <div>
          <input
            className=""
            placeholder="What's happening?"
            type="text"
            autoFocus
            value={uploadText}
            onChange={(e) => setUploadText(e.target.value)}
          />
          <IconButton>
            <label>
              <AddPhotoIcon
                className={
                  uploadImage
                    ? "bg-sub-color cursor-pointer"
                    : "text-gray-300 cursor-pointer"
                }
              />
              <input
                className="hidden"
                type="file"
                onChange={onChangeImageHandler}
              />
            </label>
          </IconButton>
        </div>
        <button
          type="submit"
          disabled={!uploadText}
          className={
            uploadText
              ? "bg-sub-color p-2 rounded-2xl"
              : "text-gray-300 p-2 rounded-2xl"
          }
        >
          作成！
        </button>
      </form>
    </>
  );
};

export default CreateList;
