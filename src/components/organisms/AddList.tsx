import React, { useState } from "react";
import firebase from "firebase/app";
import { storage, db, auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useHistory } from "react-router-dom";
import { selectPost } from "../../features/postSlice";

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

  console.log("テスト1です");
  console.log(storePostId.postId);
  console.log("テスト2です");
  console.log(storePostId);

  const onChangeImageHandler = (e: any) => {
    if (e.target.files![0]) {
      setUploadImage(e.target.files![0]);
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
      e.target.value = "";
    }
  };

  // const processImage = (e: any) => {
  //   const imageFile = e.target.files[0];
  //   const imageUrl = URL.createObjectURL(imageFile);
  //   setFileUrl(imageUrl);
  // };

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
              db.collection(user.uid)
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
      db.collection(user.uid)
        .doc(storePostId.postId)
        .collection("restaurant")
        .add({
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
    history.push("/");
  };
  return (
    <>
      <form onSubmit={addList} className="pl-5 flex-1">
        <div>
          <div>
            <label>
              店名
              <input
                className="mt-5 ml-10"
                placeholder="店名を入力"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            {/* プレビュー画像を表示 */}
            <div className="w-3/4">
              <img src={fileUrl}></img>
            </div>
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
