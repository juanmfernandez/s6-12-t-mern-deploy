import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppStore } from "../../app/store";
import { PublicRoutes } from "../../models/routes";

interface Props {
  privateValidation: boolean;
}

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: AppStore) => store.auth);

  if (!userState.token && privateValidation) return <Outlet />;

  if (!userState.token) return <Navigate replace to={PublicRoutes.HOME} />;

  return <Navigate replace to={PublicRoutes.HOME} />;
};

export default AuthGuard;
