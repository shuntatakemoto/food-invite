import React from "react";
import { useSelector } from "react-redux";
import { selectItem } from "../../features/itemSlice";

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
      <p>{item.itemName}</p>
      <p>{item.itemMemo}</p>
      <p>{item.itemPostId}</p>
      <p>{item.itemUrl}</p>
      <p>{item.itemUserName}</p>
      <img src={item.itemImageUrl} alt="" className="w-4 rounded-3xl" />
    </div>
  );
};

export default MyItem;
