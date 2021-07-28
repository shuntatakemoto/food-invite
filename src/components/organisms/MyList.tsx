import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Post from "../molecules/Post";
import { useParams } from "react-router-dom";

const MyList: React.FC = () => {
  const params = useParams<{ uid: string; id: string }>();
  const id = params.id;
  const uid = params.uid;
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
      .collection(uid)
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
      <div className="grid grid-cols-2 xl:grid-cols-4 text-center">
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
