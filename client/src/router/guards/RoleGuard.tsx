import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppStore } from "../../app/store";
import { PublicRoutes } from "../../models/routes";

interface Props {
  rol: string;
}

function RoleGuard({ rol }: Props) {
  const { user, token } = useSelector((store: AppStore) => store.auth);

  let rolUser: string = "";

  switch (user.isAdmin) {
    case true:
      rolUser = "admin";
      break;
    case false:
      rolUser = token ? "user" : "notRegister";
      break;
    case null:
      rolUser = token ? "user" : "notRegister";
      break;

    default:
      rolUser = "notRegister";
      break;
  }

  return rolUser === rol ? <Outlet /> : <Navigate replace to={PublicRoutes.HOME} />;
}
export default RoleGuard;
