import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import InstaCarousel from "../../components/InstaCarousel/InstaCarousel";
import Offer from "../../components/Offer/Offer";
import News from "../../components/News/News";

export default function Home() {
  return (
    <div className="">
      <Offer />
      <ProductCarousel />
      <News />
      <InstaCarousel />
    </div>
  );
}
