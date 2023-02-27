import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiBabyFace } from "react-icons/gi";
import { BsCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const mockup = [
  {
    id: 1,
    title: "Categoría",
    content: [
      { icon: `s`, name: "BALLET" },
      { icon: `s`, name: "JAZZ" },
      { icon: `s`, name: "PERSONAJE" },
      { icon: `s`, name: "DANSNEAKERS" },
      { icon: `s`, name: "BALLROOM" },
      { icon: `s`, name: "MODERNO" },
      { icon: `s`, name: "TANGO" },
      { icon: `s`, name: "OUTLET" }
    ]
  },
  {
    id: 2,

    title: "Marcas",
    content: [{ name: "CAPEZIO" }, { name: "SANSHA" }, { name: "LaDuca" }, { name: "BLOCH" }]
  },
  {
    id: 3,

    title: "Colores",
    content: [
      { color: "#000", name: "NEGRO" },
      { color: "#E42E2E", name: "ROJO" },
      { color: "#D8BEAF", name: "BEIGE" },
      { color: "#4B2417", name: "MARRÓN" }
    ]
  },
  {
    id: 4,

    title: "Edad",
    content: [
      { icon: `s`, name: "Niños" },
      { icon: `s`, name: "Adultos" }
    ]
  },
  {
    id: 5,

    title: "Sexo",
    content: [
      { icon: `s`, name: "Unisex" },
      { icon: `s`, name: "Hombre" },
      { icon: `s`, name: "Mujer" }
    ]
  },
  {
    id: 6,

    title: "Talles",
    content: [
      { icon: `s`, name: "Niños" },
      { icon: `s`, name: "Adultos" }
    ]
  },
  {
    id: 7,

    title: "Orden",
    content: [
      { name: "Relevante" },
      { name: "Más populares" },
      { name: "Nombre: A-Z" },
      { name: "Nombre: Z-A" },
      { name: "Precio: Alto a bajo" },
      { name: "Precio: Bajo a alto" },
      { name: "Puntuación más alta" }
    ]
  }
];

interface Props {
  setFiltersOpen: (active: boolean) => void;
  filtersOpen: boolean;
}

type Properties = {
  color?: string;
  icon?: string;
  name: string;
};
const FilterDropdown = ({ setFiltersOpen, filtersOpen }: Props) => {
  const [show, setShow] = useState<Number | null>(null);
  const [filterOptions, setFilterOptions] = useState<Properties[]>([]);
  console.log(filterOptions);

  const handleAddFilter = (item: Properties) => {
    const itemFinded = filterOptions.find((option: Properties) => option.name === item.name);

    try {
      if (!itemFinded) setFilterOptions([...filterOptions, item]);
    } catch (error) {
      return error;
    }
  };

  const handleDeleteFilter = (name: string) => {
    try {
      const itemFiltered = filterOptions.filter((option: Properties) => option.name !== name);
      setFilterOptions(itemFiltered);
    } catch (error) {
      return error;
    }
  };

  const toggle = (id: Number | null) => {
    try {
      if (show === id) {
        setShow(null);
      } else {
        return setShow(id);
      }
      return setShow(null);
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="filterdropdown">
      <div className="filterdropdown__header">
        <p className="filterdropdown__header__text">Definir filtros y orden</p>
        <AiOutlineClose
          className="filterdropdown__header__close"
          onClick={() => setFiltersOpen(!filtersOpen)}
        />
      </div>
      {filterOptions.length > 0 && (
        <div className="filterdropdown__filtered">
          <p className="filterdropdown__filtered__text">Filtros seleccionados:</p>
          <div className="filterdropdown__filtered__items">
            {filterOptions.map(option => {
              return (
                <div className="filterdropdown__filtered__items__item">
                  <GiBabyFace className="filterdropdown__filtered__items__item__icon" />
                  <p className="filterdropdown__filtered__items__item__name">{option.name}</p>
                  <AiOutlineClose
                    className="filterdropdown__filtered__items__item__close"
                    onClick={() => handleDeleteFilter(option.name)}
                  />
                </div>
              );
            })}
          </div>
          <p className="filterdropdown__filtered__clean" onClick={() => setFilterOptions([])}>
            Limpiar filtros
          </p>
        </div>
      )}
      <div className="filterdropdown__items">
        {mockup.map(item => {
          return (
            <div className="filterdropdown__items__item" key={`dropdown-${item.id}`}>
              <div className="filterdropdown__items__item__closed" onClick={() => toggle(item.id)}>
                <p className="filterdropdown__items__item__closed__text">{item.title}</p>
                {show === item.id ? (
                  <MdKeyboardArrowUp className="filterdropdown__items__item__closed__icon" />
                ) : (
                  <MdKeyboardArrowDown className="filterdropdown__items__item__closed__icon" />
                )}
              </div>

              {show === item.id &&
                item.content.map((properties: Properties, index) => {
                  const { color, icon, name } = properties;
                  return (
                    <div
                      className="filterdropdown__items__item__open"
                      key={index}
                      onClick={() => handleAddFilter(properties)}
                    >
                      {icon && <GiBabyFace className="filterdropdown__items__item__open__icon" />}
                      {color && (
                        <BsCircleFill
                          color={color}
                          className="filterdropdown__items__item__open__icon"
                        />
                      )}

                      <p className="filterdropdown__items__item__open__text">{name}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <button className="filterdropdown__btn">Definir Filtros</button>
    </div>
  );
};

export default FilterDropdown;
