import React, { useState } from "react";
import firebase from "firebase/app";
import { storage, db, auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import { selectPost } from "../../features/postSlice";
import TextField from "@material-ui/core/TextField";
import { useHistory, useParams } from "react-router-dom";
interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  username: string;
  timestamp: any;
}

const AddList: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [restaurantUrl, setRestaurantUrl] = useState("");
  const [fileUrl, setFileUrl] = useState<any>(null);
  const history = useHistory();
  const storePostId = useSelector(selectPost);
  const params = useParams() as any;
  const uid = params.uid as string;

  const onChangeImageHandler = (e: any) => {
    if (e.target.files![0]) {
      setUploadImage(e.target.files![0]);
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
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
      const uploadTweetImg = storage
        .ref(`${user.uid}/${fileName}`)
        .put(uploadImage);
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref(user.uid)
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              // db.collection(user.uid)
              db.collection(uid)
                .doc(storePostId.postId)
                .collection("restaurant")
                .add({
                  imageurl: url,
                  name: name,
                  memo: memo,
                  url: restaurantUrl,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  username: user.displayName,
                });
            });
        }
      );
    } else {
      db.collection(uid).doc(storePostId.postId).collection("restaurant").add({
        name: name,
        memo: memo,
        url: restaurantUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      });
    }
    setUploadImage(null);
    setName("");
    setMemo("");
    setRestaurantUrl("");
    history.push(`/${uid}/${storePostId.postId}`);
  };
  return (
    <>
      <form onSubmit={addList} className="px-10 flex-1">
        <div>
          <TextField
            label="店名"
            placeholder="店名を入力"
            multiline
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-5"
          />

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
            {/* プレビュー画像を表示 */}
            <div className="w-3/4">
              <img src={fileUrl}></img>
            </div>
          </div>

          <TextField
            label="メモ"
            placeholder="メモを入力"
            multiline
            fullWidth
            margin="normal"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="mt-5"
          />

          <TextField
            label="URL"
            placeholder="店情報のあるURLを入力"
            multiline
            fullWidth
            margin="normal"
            value={restaurantUrl}
            onChange={(e) => setRestaurantUrl(e.target.value)}
            className="mt-5"
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            disabled={!name}
            className={
              name
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
