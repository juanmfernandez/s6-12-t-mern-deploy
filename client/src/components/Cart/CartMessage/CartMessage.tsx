import { Icons } from "../../../assets/icons/icons";

export default function CartMessage() {
  return (
    <div className="cart__message">
      <div className="cart__message__container">
        <p className="cart__message__container__text">En</p>
        <img className="cart__message__container__logo" src={Icons.LogoBlack} alt="logo" />
        <p className="cart__message__container__text">usamos</p>
      </div>
      <img className="cart__message__mp" src={Icons.MercadoPago} alt="mp" />
      <p className="cart__message__cuotas">¡Cuotas sin interés! Procesado por Mercado Pago</p>
      <p className="cart__message__cuotas">Hasta 12 cuotas sin recargo.</p>
    </div>
  );
}
