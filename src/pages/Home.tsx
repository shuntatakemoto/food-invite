import React, { useState } from "react";
import { auth } from "../firebase";
import LockIcon from "@material-ui/icons/Lock";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "../features/userSlice";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyPage from "../components/MyPage";
import MyList from "../components/MyList";
import CreateList from "../components/CreateList";
import AddList from "../components/AddList";
import WholeMyList from "../components/WholeMyList";
import Detail from "../components/Detail";
import Bookmark from "../components/Bookmark";
import MyItem from "../components/MyItem";

const Home: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Header />
      {user.uid && <Route exact path={"/"} component={MyPage} />}
      <Route path={"/create-list"} component={CreateList} />
      <Route path={"/my-list"} component={WholeMyList} />
      <Route path={"/add-list"} component={AddList} />
      <Route path={"/detail"} component={Detail} />
      <Route path={"/bookmark"} component={Bookmark} />
      <Route path={"/my-item"} component={MyItem} />
      <Footer />
    </>
  );
};

export default Home;
