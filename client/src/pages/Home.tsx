import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans text-zinc-900">
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <BarChart3 size={20} strokeWidth={3} />
            </div>
            <span>TuGestión.io</span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-semibold bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg"
          >
            Registrarse
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-12 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Nueva versión 2.0 disponible
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-pretty">
          Toma el control total de <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
             tus finanzas hoy.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mb-10 leading-relaxed">
          La plataforma intuitiva para freelancers y pymes. Gestiona ingresos, monitorea gastos y visualiza tu crecimiento en tiempo real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
             to="/register"
             className="group flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Comenzar Gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center px-8 py-4 bg-white text-zinc-700 border border-zinc-200 rounded-xl font-bold text-lg hover:bg-zinc-50 hover:border-zinc-300 transition-all"
          >
            Ver Demo
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-24 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                        <BarChart3 size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Reportes Claros</h3>
                    <p className="text-zinc-500">Visualiza tus datos con gráficos interactivos y entiende a dónde va tu dinero al instante.</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-purple-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Seguridad Total</h3>
                    <p className="text-zinc-500">Tus datos están encriptados y protegidos con los más altos estándares de la industria.</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Rápido y Fácil</h3>
                    <p className="text-zinc-500">Diseñado para ser veloz. Carga tus gastos en segundos y sigue con tu día.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-100 text-center">
          <p className="text-zinc-400 text-sm">© 2024 TuGestión.io. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
