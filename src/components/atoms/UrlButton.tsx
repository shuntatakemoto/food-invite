import React from "react";
interface PROPS {
  buttonText: string;
  buttonLink: string;
}

const UrlButton: React.FC<PROPS> = (props) => {
  return (
    <div className="text-center ">
      <a href={props.buttonLink}>
        <button className="bg-black text-white w-56 font-bold py-2 px-5 rounded-full shadow-xl hover:bg-gray-400 hover:text-white mt-5">
          {props.buttonText}
        </button>
      </a>
    </div>
  );
};

export default UrlButton;
