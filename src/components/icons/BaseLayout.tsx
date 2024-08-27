import { FC, ReactNode } from "react";
import Navbar from "../Navbar";

interface Props {
  children: ReactNode;
  hideFooter?: boolean;
}

export const BaseLayout: FC<Props> = ({ children, hideFooter }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        {!hideFooter && (
          <footer className="mt-12 bg-gray-50 pfont text-sm text-gray-500 sm:mt-auto text-center flex-shrink-0 p-4">
            <small className="text-sm">
              © {new Date().getFullYear()} Z&H |{" "}
            </small>
            <button>Términos de servicio</button> |{" "}
            <button>Política de privacidad</button>
          </footer>
        )}
      </div>
    </>
  );
};
