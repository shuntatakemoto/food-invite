import React, { useState } from "react";
import { auth } from "../../firebase";
import LockIcon from "@material-ui/icons/Lock";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "../../features/userSlice";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import MyPage from "../templates/MyPage";
import MyList from "../organisms/MyList";
import CreateList from "../organisms/CreateList";
import AddList from "../organisms/AddList";
import WholeMyList from "../organisms/WholeMyList";
import Detail from "../templates/Detail";
import Bookmark from "../templates/Bookmark";
import MyItem from "../templates/MyItem";

const Home: React.FC = () => {
  const user = useSelector(selectUser);
  // const uid = user.uid;
  return (
    <div className="bg-main-color flex min-h-screen flex-col ">
      <Header />
      {/* ユーザー毎にurlを変更しないとシェアできないのでは？ */}
      {/* {user.uid && <Route exact path={"/user/:id"} component={MyPage} />} */}
      {user.uid && <Route exact path={"/"} component={MyPage} />}
      <Route path={"/create-list"} component={CreateList} />
      <Route path={"/my-list"} component={WholeMyList} />
      <Route path={"/add-list"} component={AddList} />
      <Route path={"/detail"} component={Detail} />
      <Route path={"/bookmark"} component={Bookmark} />
      <Route path={"/my-item"} component={MyItem} />
      <Footer />
    </div>
  );
};

export default Home;
