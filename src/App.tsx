import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Auth from "./components/organisms/Auth";
import Home from "./components/pages/Home";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  // return <>{user.uid ? <Home /> : <Auth />}</>;
  //ここは<Home/>にしてHomeコンポーネントでuidがあるかどうかを条件分岐させる-hooksでする
  return <>{user.uid ? <Home /> : <Auth />}</>;
};

export default App;
