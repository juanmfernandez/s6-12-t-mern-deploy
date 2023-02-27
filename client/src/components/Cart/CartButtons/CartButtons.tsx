import { Link } from "react-router-dom";
import { Icons } from "../../../assets/icons/icons";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

type CartButtonProps = {
  stage: number;
  incrementStage: (stage: number) => void;
  decrementStage: (stage: number) => void;
};

export default function CartButtons({ stage, incrementStage, decrementStage }: CartButtonProps) {
  return (
    <div className="cart__buttons">
      <Link
        to={stage === 1 ? "/" : "/cart"}
        onClick={() => decrementStage(stage)}
        className="cart__buttons__button"
      >
        <VscChevronLeft className="cart__buttons__icons" />
        {stage === 1 ? "VOLVER AL INICIO" : "VOLVER ATRAS"}
      </Link>
      <Link to="/cart" onClick={() => incrementStage(stage)} className="cart__buttons__button">
        {stage === 3 ? (
          <>
            PAGAR CON <img className="cart__buttons__mp" src={Icons.MercadoPago} />
          </>
        ) : (
          "CONTINUAR"
        )}
        <VscChevronRight className="cart__buttons__icons" />
        {/* <img src={Icons.MercadoPago}/> */}
      </Link>
    </div>
  );
}
