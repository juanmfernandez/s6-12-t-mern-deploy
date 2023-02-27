import { MouseEvent, FC, Dispatch, SetStateAction } from "react";
import { ProductInCart } from "../../models/ProductInCart";
import { TypeTagsEmun } from "../../models/TypeTagsEmun";

interface Iprops {
  title?: string;
  dataTag: { id: string; name: string; value: string }[];
  type: TypeTagsEmun;
  addCart: ProductInCart;
  setAddCart: Dispatch<SetStateAction<ProductInCart>>;
}

export const Tags: FC<Iprops> = ({ dataTag, type, addCart, setAddCart }) => {
  const handleClickSize = (event: MouseEvent) => {
    let style = event.currentTarget.className;
    let selectedOld = document.getElementsByClassName(`body__tag__${type}__selected`);

    if (selectedOld.length > 0) selectedOld[0].className = `body__tag__${type}`;

    event.currentTarget.className = `${style} body__tag__${type}__selected`;

    setAddCart({ ...addCart, [type]: event.currentTarget.id });
  };

  return (
    <div className="body__tag">
      {dataTag.map(data => {
        return type === "colors" ? (
          <div
            key={`${data}-${data.id}`}
            id={data.id}
            onClick={handleClickSize}
            className={`body__tag__${type}`}
            style={{ backgroundColor: data.value }}
          />
        ) : (
          <div
            key={`${type}-${data.id}`}
            id={data.id}
            onClick={handleClickSize}
            className={`body__tag__${type}`}
          >
            {data.value}
          </div>
        );
      })}
    </div>
  );
};
