import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../app/state/authSlice";
import { AppStore } from "../../../app/store";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function UserDropMenu() {
  const user = useSelector((store: AppStore) => store.auth.user);

  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpenUserMenu(false);
  }, [pathname]);
  const openUserMenuFunction = (): void => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };
  const logout = (): void => {
    dispatch(setLogout());
  };

  return (
    <span className="header__containerIcons__user">
      {user.name ? (
        user.isAdmin ? (
          <>
            <div className="userDropBtn" onClick={openUserMenuFunction}>
              <FaUser />
              {user.name}
              {isOpenUserMenu ? <BiChevronUp /> : <BiChevronDown />}
            </div>
            <div className="userDropMenu" hidden={!isOpenUserMenu}>
              <Link to={"/"} className="userDropMenu__btn__primary">
                Panel de Productos
              </Link>
              <Link to={"/"} className="userDropMenu__btn">
                Cuenta
              </Link>
              <Link to={"/"} className="userDropMenu__btn">
                Ordenes
              </Link>
              <Link to={"/"} className="userDropMenu__btn" onClick={logout}>
                Salir
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="userDropBtn" onClick={openUserMenuFunction}>
              <FaUser />
              {user.name}
              {isOpenUserMenu ? <BiChevronUp /> : <BiChevronDown />}
            </div>
            <div className="userDropMenu" hidden={!isOpenUserMenu}>
              <Link to={"./"} className="userDropMenu__btn__primary">
                Mis compras
              </Link>
              <Link to={"./"} className="userDropMenu__btn">
                Mis valoraciones
              </Link>
              <Link to={"/profile"} className="userDropMenu__btn">
                Mi cuenta
              </Link>
              <Link to={"/"} className="userDropMenu__btn" onClick={logout}>
                Salir
              </Link>
            </div>
          </>
        )
      ) : (
        <>
          <div className="userDropBtn" onClick={openUserMenuFunction}>
            Mi cuenta
            <FaAngleDown />
          </div>
          <div className="userDropMenu" hidden={!isOpenUserMenu}>
            <Link to={"./login"} className="userDropMenu__btn__primary">
              Ingresar
            </Link>
            <p className="userDropMenu__divider">o</p>
            <Link to={"./login"} className="userDropMenu__btn google">
              {" "}
              <FcGoogle /> Continuar con Google
            </Link>
            <Link to={"/signup"} className="userDropMenu__btn">
              Regístrarse
            </Link>
          </div>
        </>
      )}
    </span>
  );
}
