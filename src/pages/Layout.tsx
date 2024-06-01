import { ReactNode } from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {title && (
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl text-primary-400 mt-10">
          {title}
        </h1>
      )}
      <div
        className={`flex-grow relative grid-flow-row items-center p-4 mx-auto max-w-4xl `}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
