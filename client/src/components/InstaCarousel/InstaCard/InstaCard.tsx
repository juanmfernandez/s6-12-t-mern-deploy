import { FC } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { DataIG } from "../../../models/DataIG";

const InstaCard: FC<DataIG> = ({
  caption,
  media_url,
  permalink,
  thumbnail_url,
  media_type
}: DataIG) => {
  return (
    <a href={permalink} target="_blank" rel="noopener noreferrer">
      <div className="instacard">
        <img
          src={media_type === "VIDEO" ? thumbnail_url : media_url}
          alt=""
          className="instacard__img"
        />
        <div className="instacard__body">
          <i className="instacard__body__icon">
            <AiOutlineInstagram />
          </i>
          <p className="instacard__body__text">{caption.slice(0, 50)}...</p>
        </div>
      </div>
    </a>
  );
};

export default InstaCard;
