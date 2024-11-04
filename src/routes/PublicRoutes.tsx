import { useSelector } from "react-redux";
import { RootState } from "./../store";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
