import React from "react";
import {
  TwitterIcon,
  TwitterShareButton,
  LineIcon,
  LineShareButton,
  HatenaIcon,
  HatenaShareButton,
} from "react-share";

type Props = {
  text: string;
  url: string;
};

export const Share = ({ text, url }: Props) => {
  return (
    <ul className="flex justify-center list-none">
      <li className="mr-8">
        <TwitterShareButton url={url} title={text}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </li>
      <li className="mr-8">
        <LineShareButton url={url}>
          <LineIcon size={32} round={true} />
        </LineShareButton>
      </li>
      <li>
        <HatenaShareButton url={url}>
          <HatenaIcon size={32} round={true} />
        </HatenaShareButton>
      </li>
    </ul>
  );
};
