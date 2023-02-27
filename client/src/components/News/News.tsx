import { Icons } from "../../assets/icons/icons";

export default function News() {
  const shoeImg: string =
    "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2FproductNews%2FshoesNews.png?alt=media&token=6ca38edc-a923-41c0-b467-3a89537b204c";
  return (
    <section className="news">
      <p className="news__title">Novedades</p>
      <div className="content">
        <div className="img-container container-shoe">
          <p className="container-shoe__title">Los mejores calzados de baile en un solo lugar</p>
          <img className="container-shoe__img shoe" src={shoeImg} alt="shoe image" />
          <img className="container-shoe__logo" src={Icons.Logo} alt="logo" />
        </div>
        <div className="img-container container-unisex ">
          <p className="container-unisex__title">Calzados Unisex</p>
          <img className="container-unisex__img unisex" src={Icons.Unisex} alt="unisex icon" />
          <p className="container-unisex__text-bottom">
            No tendrás problemas en conseguir tu calzado
          </p>
        </div>
      </div>
    </section>
  );
}
