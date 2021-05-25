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
      <p className="text-center">{item.itemName}</p>
      <p className="text-center">{item.itemMemo}</p>
      {/* <p>{item.itemPostId}</p> */}
      <p className="text-center">
        <a href={item.itemUrl}>詳しい店情報</a>
      </p>
      <div className="text-center w-2/3">
        <img src={item.itemImageUrl} alt="" />
      </div>
      <p>added by {item.itemUserName}</p>
    </div>
  );
};

export default MyItem;
