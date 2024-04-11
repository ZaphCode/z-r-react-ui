import { FC } from "react";
import { useAuthStore } from "../stores/auth";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const AuthReq: FC<Props> = ({ children }) => {
  const authenticated = useAuthStore(store => store.authenticated);

  if (!authenticated) return <Navigate to={"/auth"} replace={true} />;

  return children;
};

export default AuthReq;
