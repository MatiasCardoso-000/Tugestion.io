import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { HamburguerIcon, SettingsIcon } from "../Icons/Icons";

const Header = ({ toggleMenu }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header className="w-full flex  gap-4 md:flex-row-reverse items-center justify-between py-4 px-8">
      <Link to="/dashboard" className=" text-2xl font-extrabold text-zinc-900">
        TuGestión.io
      </Link>
      <nav>
        <ul className="flex items-center gap-6 ">
          <button onClick={toggleMenu}>
            <HamburguerIcon />
          </button>
          {user ? (
            <li className="relative">
              <button
                className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900 font-semibold focus:outline-none cursor-pointer"
                onClick={handleOpenMenu}
              >
                <SettingsIcon />
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {menuOpen && (
                <div
                  className={` absolute right-0 md:left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 `}
                >
               
                  <button
                    className={`block w-full text-left px-4 py-2 rounded-md cursor-pointer text-zinc-900  hover:bg-zinc-800 transition-colors hover:text-white 
                ` }
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-zinc-700 hover:text-zinc-900 font-semibold"
              >
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
