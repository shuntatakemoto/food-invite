import React from "react";
interface PROPS {
  buttonText: string;
  buttonLink: string;
}

const UrlButton: React.FC<PROPS> = (props) => {
  return (
    <div className="text-center my-5 ">
      <a
        href={props.buttonLink}
        className="bg-black text-white font-bold py-2 px-5 rounded-full shadow-xl hover:bg-gray-400 hover:text-white "
      >
        <span className="text-lg font-light">{props.buttonText}</span>
      </a>
    </div>
  );
};

export default UrlButton;
