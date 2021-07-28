import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectItem } from "../../features/itemSlice";
import UrlButton from "../atoms/UrlButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "../../firebase";
import { selectPost } from "../../features/postSlice";
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
  const item = useSelector(selectItem);
  const history = useHistory();
  const user = useSelector(selectUser);
  const post = useSelector(selectPost);
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
      {user.uid && (
        <div>
          <p>この店を削除する</p>
          <DeleteIcon fontSize="large" onClick={deleteItem} />
        </div>
      )}
      <p className="text-center">{posts.name}</p>
      <p className="text-center">{posts.memo}</p>
      <UrlButton buttonText="詳しい店情報" buttonLink={posts.url} />
      <div className="">
        <img
          src={posts.imageurl}
          className="text-center w-72 h-72 object-cover m-auto"
          alt=""
        />
      </div>
      <p>added by {posts.username}</p>
    </div>
  );
};

export default MyItem;
