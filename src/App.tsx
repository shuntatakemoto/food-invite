import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Home from "./components/pages/Home";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
            twitterUid: authUser.providerData[0]?.uid,
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
  // return <>{user.uid ? <Home /> : <Auth />}</>;
  return <>{<Home />}</>;
};

export default App;
