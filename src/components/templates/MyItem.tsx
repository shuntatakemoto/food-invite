import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectItem } from "../../features/itemSlice";
import Button from "../atoms/Button";
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
  const params = useParams() as any;
  const id = params.id as string;
  const itemId = params.itemId as string;
  const uid = params.uid as string;

  // useEffect(() => {
  //   const unSub = db
  //     .collection(user.uid)
  //     .doc(id)
  //     .get()
  //     .then((doc) => setPosts(doc.data()));

  //   // return () => {
  //   //   unSub();
  //   // };
  // }, []);

  useEffect(() => {
    const unSub = db
      .collection(uid)
      .doc(id)
      // .doc(listId)
      .collection("restaurant")
      .doc(itemId)
      // .doc(restaurantId)
      .get()
      .then((doc) => setPosts(doc.data()));

    // return () => {
    //   unSub();
    // };
  }, []);

  // console.log(posts);
  console.log(itemId);
  // console.log(id);

  const deleteItem = () => {
    db.collection(user.uid)
      .doc(post.postId)
      .collection("restaurant")
      .doc(item.itemPostId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    history.push(`/${uid}/${post.postId}`);
  };

  return (
    <div className="flex-1">
      <p>MyItem.tsx</p>
      <p>この店を削除する</p>
      {user.uid && <DeleteIcon fontSize="large" onClick={deleteItem} />}
      {/* <p className="text-center">{item.itemName}</p> */}
      <p className="text-center">{posts.name}</p>
      {/* <p className="text-center">{item.itemMemo}</p> */}
      <p className="text-center">{posts.memo}</p>
      {/* <p>{item.itemPostId}</p> */}
      {/* <UrlButton buttonText="詳しい店情報" buttonLink={item.itemUrl} /> */}
      <UrlButton buttonText="詳しい店情報" buttonLink={posts.url} />
      <div className="">
        {/* <img
          src={item.itemImageUrl}
          className="text-center w-72 h-72 object-cover m-auto"
          alt=""
        /> */}
        <img
          src={posts.imageurl}
          className="text-center w-72 h-72 object-cover m-auto"
          alt=""
        />
      </div>
      {/* <p>added by {item.itemUserName}</p> */}
      {/* <p>added by {user.displayName}</p> */}
      <p>added by {posts.username}</p>
    </div>
  );
};

export default MyItem;
