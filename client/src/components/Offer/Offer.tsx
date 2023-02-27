import { Link } from "react-router-dom";

export default function Offer() {
  const imgLink: string =
    "https://images.pexels.com/photos/10640601/pexels-photo-10640601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <section className="offer">
      <div className="title">
        <p className="title__text">20% OFF por compras mayor de 20 unidades del mismo zapato</p>
      </div>
      <div className="content">
        <img className="content__img" src={imgLink} alt="Ballet practice" />
        <div className="text-container">
          <p className="text-container__title">DESCUENTOS EN BALLET</p>
          <p className="text-container__text">Las últimas tendencias de descuento hoy.</p>
          <Link className="text-container__link" to={"./"}>
            Ver ofertas
          </Link>
        </div>
      </div>
    </section>
  );
}
