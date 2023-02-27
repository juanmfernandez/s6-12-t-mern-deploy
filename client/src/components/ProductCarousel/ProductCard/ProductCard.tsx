import { useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

const ProductCard = () => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="card">
      <div className="card__header">
        {isFav ? (
          <AiFillHeart
            color="#E42E2E"
            className="card__header__icon"
            onClick={() => setIsFav(!isFav)}
          />
        ) : (
          <AiOutlineHeart className="card__header__icon" onClick={() => setIsFav(!isFav)} />
        )}

        <img
          src="https://litb-cgis.rightinthebox.com/images/640x640/202204/bps/product/inc/fwfsga1649740801186.jpg"
          className="card__header__img"
          alt=""
        />
      </div>
      <div className="card__body">
        <div className="card__body__colors">
          <BsCircleFill color="#000000" className="card__body__colors__icon" />
          <BsCircleFill color="#9B5555" className="card__body__colors__icon" />
          <BsCircleFill color="#4B2417" className="card__body__colors__icon" />
        </div>
        <p className="card__body__title">Titulo del producto</p>
        <p className="card__body__subtitle">Ref:1475</p>
        <div className="card__body__star">
          <AiFillStar className="card__body__star__icon" color="#E42E2E" />
          <AiFillStar className="card__body__star__icon" color="#E42E2E" />
          <AiFillStar className="card__body__star__icon" color="#E42E2E" />
          <AiFillStar className="card__body__star__icon" color="#E42E2E" />
          <AiFillStar className="card__body__star__icon" color="#E42E2E" />
        </div>
        <p className="card__body__price">$15</p>
      </div>
    </div>
  );
};

export default ProductCard;
