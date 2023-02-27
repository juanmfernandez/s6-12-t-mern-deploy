import { useState } from "react";

import ProductList from "../../components/ProductList/ProductList";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import ProductCartDropdown from "../../components/ProductCartDropdown/ProductCartDropdown";

export default function Products() {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  return (
    <div>
      {filtersOpen ? (
        <FilterDropdown setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />
      ) : (
        <ProductList setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />
      )}
    </div>
  );
}
