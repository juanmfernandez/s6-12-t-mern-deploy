import React from "react";
import { BiTrash } from "react-icons/bi";

export default function CartBody() {
  return (
    <div className="cart__body">
      <h1 className="cart__body__title">DETALLE DEL PEDIDO</h1>
      <div className="cart__body__info">
        <img
          className="cart__body__info__img"
          src="https://s3-alpha-sig.figma.com/img/b79d/bbbe/25e68b607eabd5a5a38021cfd328e399?Expires=1678060800&Signature=VcvQGiGaOMGRgEXgQOc1GR35DjzOrlizjzErfrF77PN3lv2JlD3-AkJtPZD0zcwrHdQjSQuKi5uDNnBzor79Wa4LKNk7pMpOyNeDPgmRfIWeaGfOx~lMqYHdFwBVlAlCePPsdNTsuvMhQ3DH6l8gU0-OjYo7Q6v3~Hm2C6uHui8WX-mfnrV-jSiHgJJQHSdX5FnIDEa4r9vUhG00BE16QylJYkN1UlY78LejUUFG0yWkjGuuDTp-8r8Q1OH3QVsQv7oDaG0NyqfMATSGhdPcxZJvD2DuYGSjJAFdBwudB0v58~KC2aTHMWGK58J0szpXw4ZXY8jf6zOKtBvBz~drfQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4 "
          alt="calzado"
        />
        <div className="cart__body__info__description">
          <h2 className="cart__body__info__description__title">Cadence</h2>
          <span className="cart__body__info__description__detail">
            <p className="cart__body__info__description__detail__type">Color:</p>
            <p className="cart__body__info__description__detail__item">Negro</p>
          </span>
          <span className="cart__body__info__description__detail">
            <p className="cart__body__info__description__detail__type">Horma:</p>
            <p className="cart__body__info__description__detail__item">R</p>
          </span>
          <span className="cart__body__info__description__detail">
            <p className="cart__body__info__description__detail__type">Talle:</p>
            <p className="cart__body__info__description__detail__item">30.5</p>
          </span>
        </div>
      </div>

      <div className="cart__body__actions">
        <div className="cart__body__actions__container">
          <span className="cart__body__actions__container__action">-</span>
          <p className="cart__body__actions__container__quantity">1</p>
          <span className="cart__body__actions__container__action">+</span>
        </div>
        <div className="cart__body__actions__totaldelete">
          <p className="cart__body__actions__totaldelete__price">$86</p>
          <BiTrash className="cart__body__actions__totaldelete__trash" />
        </div>
      </div>

      <div className="cart__body__amounts">
        <p className="cart__body__amounts__title">Costo de envío</p>
        <p className="cart__body__amounts__price">$0</p>
      </div>
      <div className="cart__body__amounts2">
        <p className="cart__body__amounts2__title">Importe total</p>
        <p className="cart__body__amounts2__price">$86</p>
      </div>

      <p className="cart__body__cupon">¿Tíenes un cupón de descuento?</p>
      <input className="cart__body__cuponInput" type="text" placeholder="Ingrese el código" />
      <button className="cart__body__applycupon">APLICAR CUPÓN</button>
    </div>
  );
}
