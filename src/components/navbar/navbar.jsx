import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./navbar.css";
const MainNav = ({ setSearchTerm }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav
        className={`navbar navbar-light p-4 fixed top-0 w-full ${
          scrolled && "scrolled"
        }`}
      >
        <div className="container mx-auto flex items-center justify-around">
          <Link className="navbar-brand text-white text-xl font-bold" to="/">
            GAME CENTER
          </Link>

          <Link className="nav-link text-white" to="/rules">
            Правила игры
          </Link>

          <Link className="nav-link text-white" to="/indesign">
            В разработке
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
