import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UrlButton from "../atoms/UrlButton";
import { db } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import { useHistory, useParams } from "react-router-dom";
interface PROPS {
  itemName: string;
  itemPostId: string;
  itemMemo: string;
  itemUrl: string;
  itemUserName: any;
  itemImageUrl: string;
}

const MyItem: React.FC<PROPS> = (props) => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState<any>("");
  const params = useParams<{ uid: string; id: string; itemId: string }>();
  const id = params.id;
  const itemId = params.itemId;
  const uid = params.uid;

  useEffect(() => {
    const unSub = db
      .collection(uid)
      .doc(id)
      .collection("restaurant")
      .doc(itemId)
      .get()
      .then((doc) => setPosts(doc.data()));

    // return () => {
    //   unSub();
    // };
  }, []);

  const deleteItem = () => {
    db.collection(uid)
      .doc(id)
      .collection("restaurant")
      .doc(itemId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    history.push(`/${uid}/${id}`);
  };

  return (
    <div className="flex-1">
      <p className="text-center text-2xl mt-6">{posts.name}</p>
      <p className="text-center">{posts.memo}</p>
      <UrlButton buttonText="詳しい店情報" buttonLink={posts.url} />

      <div className="mt-7">
        <img
          src={posts.imageurl}
          className="text-center w-72 h-72 object-cover m-auto"
          alt=""
        />
      </div>
      <div className="grid justify-items-center items-center mt-5">
        <p>added by {posts.username}</p>
      </div>
      <div className="text-center ">
        {user.uid && (
          <button
            onClick={deleteItem}
            className="bg-red-700 text-white w-56 font-bold py-2 px-5 rounded-full shadow-xl hover:bg-gray-400 hover:text-white mt-10"
          >
            この店を削除する
          </button>
        )}
      </div>
    </div>
  );
};

export default MyItem;
