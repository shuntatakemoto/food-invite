import React, { useState, useEffect } from "react";
import MyList from "../organisms/MyList";
import { useSelector } from "react-redux";
import { selectPost } from "../../features/postSlice";
import { selectUser } from "../../features/userSlice";
import { Emoji } from "emoji-mart";
import Button from "../atoms/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "../../firebase";
import { useHistory, useParams } from "react-router-dom";
interface PROPS {
  postId: string;
  avatar: string;
  listname: string;
  username: string;
  timestamp: any;
  emojiname: string;
}
const Detail: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser);
  const storeEmojiName = useSelector(selectPost);
  const history = useHistory();
  const params = useParams() as any;
  const uid = params.uid as string;
  const id = params.id as string;
  const addLink = `/${user.uid}/add-list`;

  // const [posts, setPosts] = useState([
  //   {
  //     id: "",
  //     // avatar: "",
  //     listname: "",
  //     // username: "",
  //     timestamp: null,
  //     emojiname: "",
  //   },
  // ]);
  const [post, setPost] = useState<any>("");

  useEffect(() => {
    const unSub = db
      // .collection(user.uid)
      .collection(uid)
      .doc(id)
      .get()
      .then((doc) => setPost(doc.data()));

    // return () => {
    //   unSub();
    // };
  }, []);

  const deleteList = () => {
    db.collection(uid)
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    history.push("/");
  };

  return (
    <div className="flex-1">
      <p>Detail.tsx</p>
      <div className="flex">
        <div className="w-8 mr-5">
          {post.avatar && (
            <img
              src={post.avatar.replace("normal", "200x200")}
              alt="profile image"
              className="w-40"
            />
          )}
        </div>
        {/* <p>Created by {user.displayName}</p> */}
        <p>Created by {post.username}</p>
      </div>
      <div>
        <div className="text-center py-12">
          {/* <Emoji emoji={post.emojiname} size={64} set="twitter" /> */}
          {post.emojiname && (
            <Emoji emoji={post.emojiname} size={64} set="twitter" />
          )}
        </div>
        <h3 className="text-3xl text-center mb-10">{post.listname}</h3>
        {user.uid && (
          <Button
            buttonText="&emsp;&emsp;店を追加する&emsp;&emsp;"
            // buttonLink="/:uid/add-List"
            buttonLink={addLink}
          />
        )}
        {user.uid && (
          <Button buttonText="&nbsp;リストをシェアする&nbsp;" buttonLink="" />
        )}
        {/* <Button buttonText="このリストを保存する" buttonLink="./add-List" /> */}
        {/* <Button buttonText="このリストを削除する" buttonLink="./add-List" /> */}
        {user.uid && <DeleteIcon fontSize="large" onClick={deleteList} />}
      </div>
      <MyList />
    </div>
  );
};

export default Detail;
