const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={`${className} static bottom-0 p-4 text-center w-full text-slate-500 italic`}
    >
      <p>&copy; 2024 by GoblikM. All rights Reserved</p>
    </footer>
  );
};

export default Footer;
