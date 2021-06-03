import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Post from "../molecules/Post";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectPost } from "../../features/postSlice";
import { useHistory, useParams } from "react-router-dom";

const MyList: React.FC = () => {
  const user = useSelector(selectUser);
  const storePostId = useSelector(selectPost);
  const params = useParams() as any;
  const id = params.id as string;
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
      memo: "",
      url: "",
      imageurl: "",
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection(user.uid)
      .doc(id)
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
            memo: doc.data().memo,
            url: doc.data().url,
            imageurl: doc.data().imageurl,
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
      <div className="flex flex-wrap">
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
                memo={post.memo}
                url={post.url}
                imageurl={post.imageurl}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyList;
