import { FC } from "react";
import { useAuthStore } from "../stores/auth";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const AuthReq: FC<Props> = ({ children }) => {
  const authenticated = useAuthStore((store) => store.authenticated);
  const setLastRedirectedUrl = useAuthStore(
    (store) => store.setLastRedirectedUrl
  );

  if (!authenticated) {
    return <Navigate to={"/auth"} />;
  }

  return children;
};

export default AuthReq;
