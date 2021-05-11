import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectPost } from "../features/postSlice";

const MyList: React.FC = () => {
  const user = useSelector(selectUser);
  const storePostId = useSelector(selectPost);
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
      name: "",
      listname: "",
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection(user.uid)
      .doc(storePostId.postId)
      .collection("restaurant")
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
            name: doc.data().name,
            listname: doc.data().listname,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <div>
      <p>MyList.tsx</p>
      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              timestamp={post.timestamp}
              username={post.username}
              name={post.name}
              listname={post.listname}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default MyList;
