import InstaCard from "./InstaCard/InstaCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { getDataIG } from "../../services/httpRequest";
import { DataIG } from "../../models/DataIG";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const InstaCarousel = () => {
  const [dataIG, setDataIG] = useState<Array<DataIG>>([
    { thumbnail_url: "", media_url: "", caption: "", permalink: "", media_type: "" }
  ]);

  useEffect(() => {
    findDataIG();
  }, []);

  const findDataIG = async () => {
    const IGdata: Array<DataIG> = await getDataIG();
    setDataIG(IGdata);
  };

  return (
    <div className="carousel__container">
      <p className="carousel__title">Nuestras marcas en instagram</p>
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
        {dataIG.length > 0 &&
          dataIG.map((image, index) => {
            return (
              <SwiperSlide key={`insta-carrousel-${index}`}>
                <InstaCard
                  media_url={image.media_url}
                  caption={image.caption}
                  permalink={image.permalink}
                  thumbnail_url={image.thumbnail_url}
                  media_type={image.media_type}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default InstaCarousel;
