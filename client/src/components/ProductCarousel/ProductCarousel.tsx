import ProductCard from "./ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const arrayTest = [...new Array(8)];

const ProductCarousel = () => {
  return (
    <div className="carousel__container">
      <p className="carousel__title">Nuestros últimos productos</p>
      <Swiper
        slidesPerView={2}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 3
          },
          // when window width is >= 840px
          840: {
            width: 840,
            slidesPerView: 4
          }
        }}
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="carousel"
      >
        {arrayTest.map((test, index) => {
          return (
            <SwiperSlide key={`prodCarousel-${index}`}>
              <ProductCard />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
