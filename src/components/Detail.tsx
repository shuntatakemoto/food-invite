import React from "react";
import MyList from "../components/MyList";

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
      <div>
        <h3>リスト名{props.listname}</h3>
      </div>
      <MyList />
    </div>
  );
};

export default Detail;
