import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function ProductCartDropdown() {
  return (
    <div className="cartdropdown">
      <div className="cartdropdown__pendant"></div>
      <div className="cartdropdown__header">
        <img
          src="https://as1.ftcdn.net/v2/jpg/01/66/08/34/500_F_166083492_7iHUxI0wxkPNRye4wO0ioQrfPJxndRua.jpg"
          alt=""
          className="cartdropdown__header__img"
        />
        <div className="cartdropdown__header__info">
          <div className="cartdropdown__header__info__top">
            <p className="cartdropdown__header__info__title">Titulo de producto</p>
            <RiDeleteBinLine className="cartdropdown__header__info__icon" />
          </div>

          <div className="cartdropdown__header__info__bottom">
            <p className="cartdropdown__header__info__qty">x1</p>
            <p className="cartdropdown__header__info__price">15 USD</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="cartdropdown__body">
        <div className="cartdropdown__body__info">
          <p className="cartdropdown__body__info__text">Subtotal carrito:</p>
          <p className="cartdropdown__body__info__price">15 USD</p>
        </div>
        <Link to={"/cart"}>
          <button className="cartdropdown__body__btn">Ver carrito</button>
        </Link>
      </div>
    </div>
  );
}
