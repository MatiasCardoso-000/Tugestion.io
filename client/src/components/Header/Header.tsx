import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  },[]);

  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <Link to="/dashboard" className="text-2xl font-extrabold text-zinc-900">
        TuGestión.io
      </Link>
      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/dashboard"
              className="text-zinc-700 hover:text-zinc-900 font-semibold"
            >
              Inicio
            </Link>
          </li>
          {user && isAuthenticated ? (
            <li className="relative">
              <button
                className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900 font-semibold focus:outline-none cursor-pointer"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {user.username || user.email}
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
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-zinc-700 hover:bg-zinc-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-zinc-700 hover:bg-zinc-100"
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
