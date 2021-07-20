import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import WholePost from "../molecules/WholePost";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useHistory, useParams } from "react-router-dom";

const WholeMyList: React.FC = () => {
  const user = useSelector(selectUser);
  const params = useParams() as any;
  const uid = params.uid as string;
  const [posts, setPosts] = useState([
    {
      id: "",
      // avatar: "",
      listname: "",
      username: "",
      timestamp: null,
      emojiname: "",
    },
  ]);

  useEffect(() => {
    const unSub = db
      // .collection(user.uid)
      .collection(uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            listname: doc.data().listname,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
            emojiname: doc.data().emojiname,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <div>
      <p>WholeMyList.tsx</p>
      <p className="text-center text-2xl py-5">My list</p>
      <div className="grid grid-cols-2 xl:grid-cols-4 text-center">
        {posts[0]?.id && (
          <>
            {posts.map((post) => (
              <WholePost
                key={post.id}
                postId={post.id}
                // avatar={post.avatar}
                listname={post.listname}
                timestamp={post.timestamp}
                username={post.username}
                emojiname={post.emojiname}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WholeMyList;
