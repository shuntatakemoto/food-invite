import React from "react";
import { useSelector } from "react-redux";
import { selectItem } from "../../features/itemSlice";
import Button from "../atoms/Button";
import DeleteIcon from "@material-ui/icons/Delete";
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
  return (
    <div className="flex-1">
      <p>MyItem.tsx</p>
      <p>この店を削除する</p>
      <DeleteIcon fontSize="large" />
      <p className="text-center">{item.itemName}</p>
      <p className="text-center">{item.itemMemo}</p>
      {/* <p>{item.itemPostId}</p> */}
      <Button buttonText="詳しい店情報" buttonLink={item.itemUrl} />
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
