import { NavLink } from "react-router-dom";
import { HomeIcon, ListIcon, UserIcon } from "../Icons/Icons";

interface AsideProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

/**
 * @description Componente de la barra lateral de navegación.
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.menuOpen - Estado que indica si el menú está abierto o cerrado.
 * @returns {JSX.Element} - El componente de la barra lateral.
 */
const Aside = ({ menuOpen, setMenuOpen }: AsideProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-full ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      }  overflow-hidden`}
    >
      <button
        className="absolute top-0 right-0 p-4 text-white md:hidden"
        onClick={() => setMenuOpen(false)}
      >
        X
      </button>
      <div>
        <h2 className="text-white text-2xl font-bold p-4 ">TuGestión.io</h2>
        <nav>
          <ul className="text-white text-2xl font-bold">
            <h3 className="text-white text-xl p-4">Menú</h3>
            <NavLink
              to="/dashboard"
              className="text-white text-xl font-semibold"
            >
              <li className="flex items-center gap-4 hover:bg-zinc-800 transition-colors p-4 cursor-pointer">
                <div>
                  <HomeIcon />
                </div>
                Dashboard
              </li>
            </NavLink>

            {/* <li ><a href="/dashboard/expenses" className='text-white text-xl'>Gastos</a></li> */}
            <NavLink
              to="/dashboard/categorias"
              className="text-white text-xl font-semibold"
            >
              <li className="flex items-center gap-4 hover:bg-zinc-800 transition-colors p-4 cursor-pointer">
                <div>
                  <ListIcon />
                </div>
                Categorias
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/perfil"
              className="text-white text-xl font-semibold"
            >
              <li className="flex items-center gap-4 hover:bg-zinc-800 transition-colors p-4 cursor-pointer">
                <div className="text-white">
                  <UserIcon />
                </div>
                Perfil
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;