import { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

export default function FormSearch({}: Props) {
  const [filter, setFilter] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const setFilterFunction = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFilter(event.target.value);
  };
  const setSearchFunction = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };
  const submitSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(searchInput + " " + filter);
  };
  return (
    <form className="header__containerSearch__form" onSubmit={submitSearch}>
      <select
        id="select"
        className="header__containerSearch__form__filterInput"
        name="filter"
        title="filter"
        onChange={setFilterFunction}
      >
        <option value="all">Todas las marcas</option>
        <option value="Capezio">Capezio</option>
        <option value="Sansha">Sansha</option>
        <option value="LaDuca">LaDuca</option>
        <option value="Bloch">Bloch</option>
      </select>
      <input
        className="header__containerSearch__form__input"
        type="text"
        placeholder="¿Qué estás buscando?"
        onChange={setSearchFunction}
      />
    </form>
  );
}
