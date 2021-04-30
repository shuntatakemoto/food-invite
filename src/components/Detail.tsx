import React from "react";
import MyList from "../components/MyList";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
interface PROPS {
  postId: string;
  avatar: string;
  listname: string;
  username: string;
  timestamp: any;
}
const Detail: React.FC<PROPS> = (props) => {
  return (
    <div>
      <p>Detail.tsx</p>
      <div>
        <h3>リスト名{props.listname}</h3>
        <Link to="./add-List">
          <p>店を追加する</p>
        </Link>
        <p>保存する</p>
      </div>
      <MyList />
      {/* <p>{props.postId}</p> */}
    </div>
  );
};

export default Detail;
