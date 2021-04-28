import React, { useState } from "react";
import firebase from "firebase/app";
import { storage, db, auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useHistory } from "react-router-dom";

const AddList: React.FC = () => {
  const user = useSelector(selectUser);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [uploadText, setUploadText] = useState("");
  const [memo, setMemo] = useState("");
  const [restaurantUrl, setRestaurantUrl] = useState("");

  // const backButton :React.FC=()=>{
  //   const history = useHistory();
  //   history.push("/home");
  // }

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setUploadImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const addList = (e: React.FormEvent<HTMLFormElement>) => {
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
                memo: memo,
                url: restaurantUrl,
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
        memo: memo,
        url: restaurantUrl,
      });
    }
    setUploadImage(null);
    setUploadText("");
    setMemo("");
    setRestaurantUrl("");
  };
  return (
    <>
      <form onSubmit={addList} className="pl-5 ">
        <div>
          <div>
            <label>
              店名
              <input
                className="mt-5 ml-10"
                placeholder="店名を入力"
                type="text"
                autoFocus
                value={uploadText}
                onChange={(e) => setUploadText(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-5">
            <label htmlFor="addPhoto">
              <span className="pr-5">画像があれば選択</span>
              <AddPhotoIcon
                className={
                  uploadImage
                    ? "bg-sub-color cursor-pointer"
                    : "text-gray-300 cursor-pointer"
                }
              />
              <input
                className="hidden"
                id="addPhoto"
                type="file"
                onChange={onChangeImageHandler}
              />
            </label>
          </div>

          <div>
            <label>
              メモ
              <input
                className="mt-5 ml-10"
                placeholder="一言メモを入力"
                type="text"
                autoFocus
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              URL
              <input
                className="mt-5 ml-10"
                placeholder="URLを入力"
                type="text"
                autoFocus
                value={restaurantUrl}
                onChange={(e) => setRestaurantUrl(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            disabled={!uploadText}
            // onClick={}
            className={
              uploadText
                ? "bg-sub-color p-2 rounded-2xl mb-5"
                : "text-gray-300 p-2 rounded-2xl mb-5"
            }
          >
            作成
          </button>
        </div>
      </form>
    </>
  );
};

export default AddList;
