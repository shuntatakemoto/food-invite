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
import Modal from "../organisms/Modal";
// interface PROPS {
//   userid: string;
//   avatar: string;
//   listname: string;
//   username: string;
//   timestamp: any;
//   emojiname: string| undefined;
// }
const Detail: React.FC = (props) => {
  const user = useSelector(selectUser);
  const storeEmojiName = useSelector(selectPost);
  const history = useHistory();
  const params = useParams() as any;
  const uid = params.uid as string;
  const id = params.id as string;
  const addLink = `/${user.uid}/add-list`;
  const DmLink =
    "https://twitter.com/messages/compose?recipient_id=" +
    user.twitterUid +
    "&text=(店名を入力)に一緒に行きたいです for Food Invite\n " +
    window.location.href;

  // const [post, setPost] = useState([
  //   {
  //     userid: "",
  //     avatar: "",
  //     listname: "",
  //     username: "",
  //     timestamp: null,
  //     emojiname: "",
  //   },
  // ]);

  const [post, setPost] = useState<any>("");
  const [show, setShow] = useState(false);

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
        <p>Created by {post.username}</p>
      </div>
      <div>
        <div className="text-center py-12">
          {post.emojiname && (
            <Emoji emoji={post.emojiname} size={64} set="twitter" />
          )}
        </div>
        <h3 className="text-3xl text-center mb-5">{post.listname}</h3>
        {user.uid && <Button buttonText="店を追加する" buttonLink={addLink} />}

        <div className="text-center ">
          {user.uid && (
            <button
              onClick={() => setShow(true)}
              className="bg-black text-white w-56 font-bold py-2 px-5 rounded-full shadow-xl hover:bg-gray-400 hover:text-white mt-5"
            >
              リストをシェアする
            </button>
          )}
        </div>
        <div className="text-center ">
          {/* 自分のリストには一緒に行きたいボタンは必要ないので条件分岐でユーザーIDが自分じゃない時に表示させる */}
          <a href={DmLink}>
            <button
              // onClick={() => setShow(true)}
              className="bg-black text-white w-56 font-bold py-2 px-5 rounded-full shadow-xl hover:bg-gray-400 hover:text-white mt-5"
            >
              一緒に行きたい
            </button>
          </a>
        </div>
        {user.uid && <DeleteIcon fontSize="large" onClick={deleteList} />}
      </div>
      <Modal show={show} setShow={setShow} content={post.listname} />
      <MyList />
      {console.log(post)}
    </div>
  );
};

export default Detail;
