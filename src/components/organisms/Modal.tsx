import React, { useState, useEffect } from "react";
import { Share } from "../molecules/Share";
// import { useParams, useHistory, useLocation } from "react-router-dom";
interface PROPS {
  show: boolean;
  // setShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
}

const Modal: React.FC<PROPS> = ({ show, setShow, content }) => {
  // const location = useLocation();
  if (show) {
    return (
      <div
        id="overlay"
        onClick={() => setShow(false)}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div
          id="content"
          onClick={(e) => e.stopPropagation()}
          className="z-10 w-3/4 p-4 bg-white"
        >
          <p>これがモーダルウィンドウです。</p>
          <p>{content}</p>
          {/* <Share text="share-test" url={location.pathname} /> */}
          <Share text="share-test" url={window.location.href} />
          {/* {console.log(location)} */}
          {/* {console.log(window.location.href)} */}
          <button onClick={() => setShow(false)}>close</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
