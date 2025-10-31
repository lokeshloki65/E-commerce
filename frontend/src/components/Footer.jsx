import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer mt-8 footer-center dark:bg-slate-800 border-t-2 border-t-slate-200 dark:border-t-slate-600 bg-base-300 text-base-content p-4">
        <aside>
          <p className="dark:text-slate-300 font-medium">
            Copyright © {new Date().getFullYear()} - All right reserved by Kavin
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
