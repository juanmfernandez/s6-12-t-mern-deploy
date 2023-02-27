import ProductCard from "../ProductCarousel/ProductCard/ProductCard";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { MdArrowForwardIos } from "react-icons/md";

interface Props {
  setFiltersOpen: (active: boolean) => void;
  filtersOpen: boolean;
}

const ProductList = ({ setFiltersOpen, filtersOpen }: Props): JSX.Element => {
  return (
    <div className="productlist">
      <p className="productlist__text">Inicio - Resultados: "zapato"</p>
      <p className="productlist__title">Resultados: "zapato"</p>
      <button className="productlist__btn" onClick={() => setFiltersOpen(true)}>
        Definir filtros
      </button>
      <p className="productlist__text__pagination">1-24/74 Productos</p>
      <div className="productlist__card__group">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="productlist__pagination">
        <button className="productlist__pagination__btn">1</button>
        <button className="productlist__pagination__btn">2</button>
        <button className="productlist__pagination__btn">3</button>
        <button className="productlist__pagination__btn">4</button>
        <button className="productlist__pagination__btn">
          <MdArrowForwardIos />
        </button>
      </div>
      {filtersOpen && <FilterDropdown setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />}
    </div>
  );
};

export default ProductList;
