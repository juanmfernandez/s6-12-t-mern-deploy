import { useRef, useState, MouseEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Zoom } from "swiper";
import { ScoreStar } from "../../components/ScoreStar/ScoreStar";
import { Tags } from "../../components/Tags/Tags";
import { TbMoodBoy } from "react-icons/tb";
import { GiPerson, GiBallerinaShoes } from "react-icons/gi";
import { AiFillHeart, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductInCart } from "../../models/ProductInCart";
import { TypeTagsEmun } from "../../models/TypeTagsEmun";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

type IsActive = {
  details: boolean;
  reviews: boolean;
};

const images = [
  "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fproductpics%2Fzapato_negro.png?alt=media&token=a966f9c8-d66f-4458-a893-588c21b11a31",
  "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fproductpics%2Fzapato_marron.png?alt=media&token=d56ecd56-b79b-4a2b-98d7-d4a3273ea8b6"
];

const colors = [
  { id: "456", name: "negro", value: "#000000" },
  { id: "457", name: "marron", value: "#D8BEAF" },
  { id: "458", name: "rojo", value: "#DF3A01" },
  { id: "459", name: "rosa", value: "#F5A9F2" },
  { id: "460", name: "naranja", value: "#FF8000" },
  { id: "461", name: "amarillo", value: "#FFFF00" }
];

const shoesLast = [
  { id: "10", name: "R", value: "R" },
  { id: "11", name: "A", value: "A" }
];

const sizes = [
  { id: "256", name: "negro", value: "17" },
  { id: "257", name: "marron", value: "17.5" },
  { id: "258", name: "rojo", value: "18" },
  { id: "259", name: "rosa", value: "18.5" },
  { id: "260", name: "naranja", value: "19" },
  { id: "261", name: "amarillo", value: "19.5" },
  { id: "262", name: "naranja", value: "20" },
  { id: "263", name: "amarillo", value: "20.5" },
  { id: "264", name: "naranja", value: "21" },
  { id: "265", name: "amarillo", value: "21.5" },
  { id: "266", name: "naranja", value: "22" },
  { id: "267", name: "amarillo", value: "22.5" }
];

export default function ProductDetail() {
  const ref = useRef<SwiperRef>(null);

  const [isFav, setIsFav] = useState<boolean>(false);
  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<IsActive>({ details: true, reviews: false });
  const [addCart, setAddCart] = useState<ProductInCart>({
    productId: "",
    quantity: 0,
    colors: "",
    sizes: "",
    shoeLast: ""
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) setAddCart({ ...addCart, productId: id });
  }, []);

  const handleQuantity = (event: MouseEvent) => {
    if (event.currentTarget.id === "plus")
      return setAddCart({ ...addCart, quantity: addCart.quantity + 1 });

    setAddCart({ ...addCart, quantity: addCart.quantity - 1 });

    if (addCart.quantity <= 0) setAddCart({ ...addCart, quantity: 0 });
  };

  const handleClickZoom = (): void => {
    if (ref.current) {
      if (isZoom) {
        ref.current.swiper.zoom.out();
      } else {
        ref.current.swiper.zoom.in();
      }
      setIsZoom(!isZoom);
    }
  };

  const handleActiveDetail = (event: MouseEvent) => {
    if (event.currentTarget.id === "detail") return setIsActive({ details: true, reviews: false });
    setIsActive({ details: false, reviews: true });
  };

  return (
    <div className="productDetail__container">
      <div className="img__container">
        <Swiper
          ref={ref}
          cssMode={true}
          navigation={false}
          slidesPerView={1}
          pagination={{
            clickable: true
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Zoom]}
          zoom={true}
          onClick={handleClickZoom}
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={`prod-${index}`} zoom>
                <img className="img__product" src={image} alt="zapato " />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <section className="body__container">
        <p className="prod__title">Cadence</p>
        <div className="category__container">
          <div className="category__icons__text">
            <GiBallerinaShoes className="category__icons" /> TAP
          </div>
          <div className="category__icons__text">
            <GiPerson className="category__icons" /> Unisex
          </div>
          <div className="category__icons__text">
            <TbMoodBoy className="category__icons" /> Niños
          </div>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fbrands%2FSansha.png?alt=media&token=94eb82b7-0c8f-4ef6-b126-3dce43bf8feb"
          alt="sansha"
        />

        <div className="body__star">
          <div className="body__price">$86</div>
          <ScoreStar scoreStar={4} />
        </div>
        <hr className="body__line" />
        <div>
          <p className="title__prop">Color</p>
          <Tags
            dataTag={colors}
            type={TypeTagsEmun.colors}
            addCart={addCart}
            setAddCart={setAddCart}
          />
          <p className="title__prop">Horma</p>
          <Tags
            dataTag={shoesLast}
            type={TypeTagsEmun.shoeLast}
            addCart={addCart}
            setAddCart={setAddCart}
          />
          <p className="title__prop">Talle</p>
          <Tags
            dataTag={sizes}
            type={TypeTagsEmun.sizes}
            addCart={addCart}
            setAddCart={setAddCart}
          />
          <p className="title__prop">Cantidad</p>
          <div className="body__quantity">
            <AiOutlineMinus id="minor" onClick={event => handleQuantity(event)} className="icon" />
            <input type="numeric" value={addCart.quantity} readOnly />
            <AiOutlinePlus id="plus" onClick={event => handleQuantity(event)} className="icon" />
          </div>
          <button className="btn__addcart" type="submit">
            Agregar al carrito
          </button>
          <div className="addFavorite" onClick={() => setIsFav(!isFav)}>
            {isFav ? (
              <AiFillHeart
                color="#E42E2E"
                className="card__header__icon"
                onClick={() => setIsFav(!isFav)}
              />
            ) : (
              <AiOutlineHeart className="card__header__icon" />
            )}
            <p>Agregar a lista de deseados</p>
          </div>
          <div className="tab__container">
            <button
              id="detail"
              onClick={event => handleActiveDetail(event)}
              className={`tab__btn ${isActive.details ? "tab__btn__active" : ""}`}
            >
              Detalles
            </button>
            <button
              onClick={event => handleActiveDetail(event)}
              className={`tab__btn ${isActive.reviews ? "tab__btn__active" : ""}`}
            >
              Reseñas
            </button>
          </div>
          {isActive.details ? (
            <div className="text__detail">
              <div className="text__detail__title">Zapato de claqué ligero cadence para niños</div>
              <p>
                Mira a tu artista favorito cerrar el escenario en el Cadence Tap Shoe. Cuenta con
                una suela de cuero duradera y los icónicos golpecitos de punta y talón Capezio® Tele
                Tone® para un sonido de toque inmaculado. El talón cónico y el ligero acolchado
                mantienen a los jóvenes bailarines moviéndose al ritmo sin ninguna dificultad.
                Características del producto: Parte superior de cuero suave Suela de piel Punteras y
                talones Tele Tone® Forro de poliéster Plantilla y collar ligeramente acolchados para
                mayor comodidad Puntera fuerte Talón cónico Parche de suela de goma ranurado para
                tracción Comience 1/2 - 1 talla más arriba de la talla de zapato de calle
              </p>
            </div>
          ) : (
            <div className="text__detail">
              <div className="text__detail__title">Alta reseñas</div>
              <p>Ta mortal el zapatito ese...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
