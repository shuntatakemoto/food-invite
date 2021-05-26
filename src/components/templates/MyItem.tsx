import React from "react";
import { useSelector } from "react-redux";
import { selectItem } from "../../features/itemSlice";
import Button from "../atoms/Button";
import UrlButton from "../atoms/UrlButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { selectPost } from "../../features/postSlice";
import { selectUser } from "../../features/userSlice";
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
    history.push("/detail");
  };

  return (
    <div className="flex-1">
      <p>MyItem.tsx</p>
      <p>この店を削除する</p>
      <DeleteIcon fontSize="large" onClick={deleteItem} />
      <p className="text-center">{item.itemName}</p>
      <p className="text-center">{item.itemMemo}</p>
      {/* <p>{item.itemPostId}</p> */}
      <UrlButton buttonText="詳しい店情報" buttonLink={item.itemUrl} />
      <div className="">
        <img
          src={item.itemImageUrl}
          className="text-center w-72 h-72 object-cover m-auto"
          alt=""
        />
      </div>
      <p>added by {item.itemUserName}</p>
    </div>
  );
};

export default MyItem;
