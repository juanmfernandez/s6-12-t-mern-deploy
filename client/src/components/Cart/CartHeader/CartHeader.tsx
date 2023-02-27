import { Icons } from "../../../assets/icons/icons";

type CartHeaderProps = {
  stage: number;
};

export default function CartHeader({ stage }: CartHeaderProps) {
  return (
    <div className="cart__header">
      <img src={Icons.LogoBlack} alt="logo" className="cart__header__logo" />
      <div className="cart__header__menu">
        <div className="cart__header__menu__container">
          <p
            className={
              stage === 1
                ? "cart__header__menu__container__numberChossed"
                : "cart__header__menu__container__number"
            }
          >
            1
          </p>
          <p
            className={
              stage === 1
                ? "cart__header__menu__container__titleChossed"
                : "cart__header__menu__container__title"
            }
          >
            FACTURACIÓN
          </p>
        </div>
        <div className="cart__header__menu__container">
          <p
            className={
              stage === 2
                ? "cart__header__menu__container__numberChossed"
                : "cart__header__menu__container__number"
            }
          >
            2
          </p>
          <p
            className={
              stage === 2
                ? "cart__header__menu__container__titleChossed"
                : "cart__header__menu__container__title"
            }
          >
            ENVÍO
          </p>
        </div>
        <div className="cart__header__menu__container">
          <p
            className={
              stage === 3
                ? "cart__header__menu__container__numberChossed"
                : "cart__header__menu__container__number"
            }
          >
            3
          </p>
          <p
            className={
              stage === 3
                ? "cart__header__menu__container__titleChossed"
                : "cart__header__menu__container__title"
            }
          >
            PAGO
          </p>
        </div>
      </div>
    </div>
  );
}
