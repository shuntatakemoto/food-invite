import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import WholePost from "../components/WholePost";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const WholeMyList: React.FC = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      listname: "",
      username: "",
      timestamp: null,
    },
  ]);

  useEffect(() => {
    const id = user.uid;
    const unSub = db
      .collection(id)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            listname: doc.data().listname,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <>
      <div>
        {posts.map((post) => (
          <WholePost
            key={post.id}
            postId={post.id}
            avatar={post.avatar}
            listname={post.listname}
            timestamp={post.timestamp}
            username={post.username}
          />
        ))}
      </div>
    </>
  );
};

export default WholeMyList;
