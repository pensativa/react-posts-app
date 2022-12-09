import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-center lg:text-left mt-6">
      <div className="text-slate-100 text-center p-4">
        {"<Created /> "} by
        <a
          className="text-white hover:text-slate-300"
          href="https://github.com/pensativa"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Mariia Opanasenko
        </a>
      </div>
    </footer>
  );
};

export default Footer;
