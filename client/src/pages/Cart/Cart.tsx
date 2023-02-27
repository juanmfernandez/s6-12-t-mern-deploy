import { useState } from "react";
import { Link } from "react-router-dom";
import CartBody from "../../components/Cart/CartBody/CartBody";
import CartButtons from "../../components/Cart/CartButtons/CartButtons";
import CartHeader from "../../components/Cart/CartHeader/CartHeader";
import CartMessage from "../../components/Cart/CartMessage/CartMessage";
import EditDirection from "../../components/ProfileComponents/EditDirection/EditDirection";
import EditProfile from "../../components/ProfileComponents/EditProfile/EditProfile";

export default function Cart() {
  const [stage, setStage] = useState<number>(1);
  const [cart, setCart] = useState<string[]>(["Hay algo en el carrito"]);
  const incrementStage = (stage: number): void => {
    if (stage === 3) {
      console.log("No se puede incrementar más");
      return;
    }
    setStage(stage + 1);
  };
  const decrementStage = (stage: number): void => {
    if (stage === 1) {
      console.log("No se puede decrementar más");
      return;
    }
    setStage(stage - 1);
  };
  return (
    <div className="cart">
      {cart.length !== 0 ? (
        <>
          <CartHeader stage={stage} />
          <div className="cart__container">
            {stage === 1 && <EditProfile mode="cart" />}
            {stage === 2 && <EditDirection />}
            <CartBody />
          </div>
          <CartButtons
            stage={stage}
            incrementStage={incrementStage}
            decrementStage={decrementStage}
          />
          {stage !== 3 ? (
            <p className="cart__offert">
              ¡SE ACERCAN LAS MUESTRAS DE FIN DE AÑO! Aprovecha un 20% OFF en compras al por mayor
            </p>
          ) : (
            <CartMessage />
          )}
        </>
      ) : (
        <>
          <div className="cart__empty">
            <h2 className="cart__empty__title">Comienza a llenar tu carrito</h2>
            <p className="cart__empty__text">
              Todas tus marcas favoritas en un solo lugar y puedes comprarlas hasta en 18 cuotas sin
              recargo.
            </p>
            <Link className="cart__empty__button" to="/products">
              Ver calzados
            </Link>
          </div>
          <CartMessage />
        </>
      )}
    </div>
  );
}
