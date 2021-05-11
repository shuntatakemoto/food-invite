import React from "react";
import MyList from "../components/MyList";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPost } from "../features/postSlice";
interface PROPS {
  postId: string;
  avatar: string;
  listname: string;
  username: string;
  timestamp: any;
}
const Detail: React.FC<PROPS> = (props) => {
  const storeListName = useSelector(selectPost);
  return (
    <div className="flex-1">
      <p>Detail.tsx</p>
      <div>
        <h3 className="text-3xl text-center">{storeListName.listName}</h3>
        <Link to="./add-List">
          <p>店を追加する</p>
        </Link>
        <p>保存する</p>
        <p>削除する</p>
      </div>
      <MyList />
    </div>
  );
};

export default Detail;
