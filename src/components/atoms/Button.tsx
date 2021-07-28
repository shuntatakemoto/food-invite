import React from "react";
import { Link } from "react-router-dom";

interface PROPS {
  buttonText: string;
  buttonLink: string;
}

const Button: React.FC<PROPS> = (props) => {
  return (
    <div className="text-center ">
      <Link to={props.buttonLink}>
        <button className="bg-black text-white w-56 font-bold py-2 px-5 rounded-full shadow-xl hover:bg-gray-400 hover:text-white mt-5">
          {props.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default Button;
