import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/icons/icons";

export default function Footer() {
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState<boolean>(window.innerWidth >= 768);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsDesktopScreen(window.innerWidth >= 768);
    });
  }, []);
  const openProfileFunction = (): void => {
    !isDesktopScreen ? setOpenProfile(!openProfile) : false;
  };
  const openHelpFunction = (): void => {
    !isDesktopScreen ? setOpenHelp(!openHelp) : false;
  };
  return (
    <footer className="footer">
      <div className="footer__content service">
        <p className="service__title">Servicio al cliente</p>
        <p className="service__number">888-386-7568</p>
        <p className="service__days">De Lunes a viernes</p>
      </div>
      <div className="footer__content drop">
        <div className="drop__component" hidden={!isDesktopScreen}>
          <p className="drop__component__title">Categorías</p>
          <ul className="drop__component__list">
            <li className="drop__component__list__item">
              <Link to={"./"}>Ballet</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"./"}>Tap</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"./"}>Jazz</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"./"}>Personaje</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"./"}>Ballroom</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"./"}>Dansneakers</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"./"}>Moderno</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"./"}>Outlet</Link>
            </li>
          </ul>
        </div>
        <div className="drop__component">
          <p className="drop__component__title" onClick={openProfileFunction}>
            Mi perfil
            {!isDesktopScreen && (
              <>
                {!openProfile ? (
                  <FaAngleDown className="drop__icon" />
                ) : (
                  <FaAngleUp className="drop__icon" />
                )}
              </>
            )}
          </p>
          <ul className="drop__component__list" hidden={!openProfile && !isDesktopScreen}>
            <li className="drop__component__list__item">
              <Link to={"/"}>Mis compras</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/cart"}>Mi lista de deseados</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Mis direcciones</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Mis valoraciones</Link>
            </li>
          </ul>
        </div>
        <div className="drop__component">
          <p className="drop__component__title" onClick={openHelpFunction}>
            Ayuda
            {!isDesktopScreen && (
              <>
                {!openHelp ? (
                  <FaAngleDown className="drop__component__icon" />
                ) : (
                  <FaAngleUp className="drop__component__icon" />
                )}
              </>
            )}
          </p>
          <ul className="drop__component__list" hidden={!openHelp && !isDesktopScreen}>
            <li className="drop__component__list__item">
              <Link to={"/"}>Preguntas frecuentes</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Quienes somos</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Soporte</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__content social">
        <img src={Icons.Logo} alt="" />
        <div className="social__component">
          <p className="social__component__text">Siguenos en </p>
          <FaInstagram className="social__component__icon instagram" />
          <FaFacebookF className="social__component__icon facebook" />
          <FaTwitter className="social__component__icon twitter" />
        </div>
      </div>
    </footer>
  );
}
