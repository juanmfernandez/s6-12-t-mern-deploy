import { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Iprops {
  scoreStar: number;
}

export const ScoreStar: FC<Iprops> = ({ scoreStar }) => {
  return (
    <div className="scoreStar__container">
      {[...new Array(5)].map((score, index) => {
        return index < scoreStar ? (
          <AiFillStar key={`start-${index}`} className="star__icon" color="#E42E2E" />
        ) : (
          <AiOutlineStar key={`start-${index}`} className="star__icon" color="#E42E2E" />
        );
      })}
      ({scoreStar})
    </div>
  );
};
