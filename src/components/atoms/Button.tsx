import React from "react";
import { Link } from "react-router-dom";

interface PROPS {
  buttonText: string;
  buttonLink: string;
}

const Button: React.FC<PROPS> = (props) => {
  return (
    <div className="text-center my-5 ">
      <Link
        to={props.buttonLink}
        className="bg-black text-white font-bold py-2 px-5 rounded-full shadow-xl hover:bg-gray-dark hover:text-white "
      >
        <span className="text-lg font-light">{props.buttonText}</span>
      </Link>
    </div>
  );
};

export default Button;
