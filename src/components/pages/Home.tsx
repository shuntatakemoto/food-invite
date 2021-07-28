import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import MyPage from "../templates/MyPage";
import CreateList from "../organisms/CreateList";
import AddList from "../organisms/AddList";
import WholeMyList from "../organisms/WholeMyList";
import Detail from "../templates/Detail";
import Bookmark from "../templates/Bookmark";
import MyItem from "../templates/MyItem";
import Auth from "../organisms/Auth";

const Home: React.FC = () => {
  const user = useSelector(selectUser);
  const userId = user.uid;

  return (
    <div className="bg-main-color flex min-h-screen flex-col ">
      <Header />
      <Switch>
        {user.uid && <Route exact path={"/:uid"} component={MyPage} />}
        <Route path={"/:uid/create-list"} component={CreateList} />
        <Route path={"/my-list"} component={WholeMyList} />
        <Route path={"/:uid/:id/add-list"} component={AddList} />
        <Route path={"/bookmark"} component={Bookmark} />
        <Route exact path={"/:uid/:id"} component={Detail} />
        {/* <Route exact path={":uid/:id"} component={Detail} /> */}
        {/* 上にするとしっかりcreate-listが表示される → switchにすることで解決 */}
        <Route
          exact
          path={"/:uid/:id/restaurants/:itemId"}
          component={MyItem}
        />

        <Route
          exact
          path="/"
          render={() => (user.uid ? <Redirect to={`${userId}`} /> : <Auth />)}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default Home;
