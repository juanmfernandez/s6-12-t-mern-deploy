import { BsXCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="NotFound">
      <div className="NotFound__message">
        <BsXCircle className="NotFound__message__icon" />
        <p className="NotFound__message__codeError">404</p>
        <p className="NotFound__message__title">Página no encontrada</p>
        <p className="NotFound__message__text">
          La página que estas buscando no existe o un error a ocurrido.
        </p>
      </div>
      <Link className="NotFound__btn" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
