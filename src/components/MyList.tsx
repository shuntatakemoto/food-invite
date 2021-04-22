import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const MyList: React.FC = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
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
            image: doc.data().image,
            text: doc.data().text,
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
          <Post
            key={post.id}
            postId={post.id}
            avatar={post.avatar}
            image={post.image}
            text={post.text}
            timestamp={post.timestamp}
            username={post.username}
          />
        ))}
      </div>
    </>
  );
};

export default MyList;
