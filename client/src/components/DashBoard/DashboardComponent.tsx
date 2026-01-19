import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { PlusIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { SearchBar } from "../SearchBar/SearchBar";
import TransactionsList from "../TransactionsList/TransactionsList";
import TransactionsListSkeleton from "../TransactionsList/TransactionsListSkeleton";
import { ArrowDown, ArrowUp, TrendingDown, Wallet, TrendingUp, Minus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useEffect, useMemo } from "react";

export const DashboardComponent = () => {
  const { isLoading, transactions } = useTransactions();

  const totalSpending = useMemo(() => {
    return transactions
      .filter(t => t.transaction_type.toLowerCase() === "gasto")
      .reduce((sum, t) => { return Number(sum) + Number(t.amount) }, 0);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter(t => t.transaction_type.toLowerCase() === "ingreso")
      .reduce((sum, t) => { return Number(sum) + Number(t.amount) }, 0);
  }, [transactions]);

  const balance = useMemo(() => {
    return totalIncome - totalSpending;
  }, [totalIncome, totalSpending]);


  const monthlyData = useMemo(() => {
    const monthMap: Record<string, { income: number; spending: number }> = {};

    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = date.toLocaleString("es-ES", { month: "short", year: "numeric" });

      if (!monthMap[monthKey]) {
        monthMap[monthKey] = { income: 0, spending: 0 };
      }

      if (t.transaction_type.toLowerCase() === "ingreso") {
        monthMap[monthKey].income += Number(t.amount);
      } else if (t.transaction_type.toLowerCase() === "gasto") {
        monthMap[monthKey].spending += Number(t.amount);
      }
    });

    return Object.entries(monthMap)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split(" ");
        const [bMonth, bYear] = b.month.split(" ");
        return parseInt(aYear) - parseInt(bYear) ||
          aMonth.localeCompare(bMonth, "es-ES");
      });
  }, [transactions]);

  return (
    <div className="w-full flex flex-col justify-between items-center gap-2 px-2 py-8 bg-zinc-50">
      <div className=" w-full flex justify-center">
        <div className="w-full flex flex-col p-2 md:p-6">
          <h2 className="text-4xl font-bold text-zinc-900 mb-8 text-center md:text-left tracking-tighter">
            Dashboard
          </h2>
          <p className="text-zinc-500 text-xl text-center md:text-left">
            Bienvenido a tu panel de gestión de gastos.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 px-2 md:px-6 mb-4">
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-zinc-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-zinc-500 text-sm font-medium">Total Gastos</h3>
                <p className="text-3xl font-bold text-zinc-900">${totalSpending.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowDown className="w-4 h-4 text-red-600" />
            <span className="text-red-600 font-medium">Salida de dinero</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-zinc-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ArrowUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-zinc-500 text-sm font-medium">Total Ingresos</h3>
                <p className="text-3xl font-bold text-zinc-900">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">Entrada de dinero</span>
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-6 mb-4">
        <div className={`w-full bg-white rounded-2xl shadow-lg p-6 border border-zinc-100 ${balance > 0 ? 'border-emerald-200' : balance < 0 ? 'border-red-200' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${balance > 0 ? 'bg-emerald-100' : balance < 0 ? 'bg-red-100' : 'bg-zinc-100'}`}>
                {balance > 0 && <TrendingUp className="w-6 h-6 text-emerald-600" />}
                {balance < 0 && <TrendingDown className="w-6 h-6 text-red-600" />}
                {balance === 0 && <Minus className="w-6 h-6 text-zinc-600" />}
              </div>
              <div>
                <h3 className="text-zinc-500 text-sm font-medium">
                  {balance > 0 ? 'Beneficio' : balance < 0 ? 'Déficit' : 'Balance Equilibrado'}
                </h3>
                <p className={`text-3xl font-bold ${balance > 0 ? 'text-emerald-600' : balance < 0 ? 'text-red-600' : 'text-zinc-900'}`}>
                  ${balance.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {balance > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Saldo positivo</span>
                </>
              ) : balance < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 font-medium">Saldo negativo</span>
                </>
              ) : (
                <>
                  <Minus className="w-4 h-4 text-zinc-600" />
                  <span className="text-zinc-600 font-medium">Sin ganancias ni pérdidas</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {monthlyData.length > 0 && (
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 border border-zinc-100 mb-4 px-2 md:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-zinc-900 text-lg font-bold">Ingresos vs Gastos</h3>
              <p className="text-zinc-500 text-sm">Comparación mensual</p>
            </div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e4e4e7",
                    borderRadius: "8px"
                  }}
                  formatter={(value?: string, name?: string): [string, string] => [`$${value}`, name!]}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: "12px" }}
                />
                <Bar
                  dataKey="income"
                  name="Ingresos"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="spending"
                  name="Gastos"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <Link
        to={"/dashboard/registrar-gasto"}
        className="mt-4 md:hidden md:w-1/12"
      >
        <Button
          buttonStyle={
            "bg-red-600 px-4 py-2 text-white flex items-center justify-evenly rounded-xl text-sm cursor-pointer hover:bg-red-700 transition-colors shadow-xl md:absolute right-10 bottom-10"
          }
        >
          <PlusIcon /> Nuevo Gasto
        </Button>
      </Link>

      {isLoading && <TransactionsListSkeleton />}
      {!isLoading && transactions.length > 0 && (
        <div className="w-full flex flex-col  items-center  justify-center md:px-4 gap-8 md:mt-8">
          <TransactionsList />
        </div>
      )}

      {!isLoading && transactions.length === 0 && (
        <h1 className="text-lg text-zinc-900 text-center mt-8">
          No hay gastos registrados
        </h1>
      )}
      <div className="w-full hidden  justify-end px-4 md:flex  md:mt-4">
        <Link to={"/dashboard/registrar-gasto"}>
          <Button
            buttonStyle={
              "bg-indigo-600 px-4 py-2 text-white flex items-center rounded-xl text-sm cursor-pointer hover:bg-indigo-700 hover:text-zinc-200 transition-colors shadow-xl"
            }
          >
            <PlusIcon /> Nuevo Gasto
          </Button>
        </Link>
      </div>
    </div>
  );
};
