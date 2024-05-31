import { ReactNode } from "react";
import Navbar from "../components/shared/Navbar";

const Layout = ({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) => {
  return (
    <>
      <Navbar />
      {title && (
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl text-primary-400 mt-10">
          {title}
        </h1>
      )}
      <div className={`grid justify-center items-center ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
