const TransactionsListSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-2xl px-6 py-8 mt-6 w-full mx-auto animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/4 mb-6 pb-3"></div>
      <div>
        {/* Mobile view skeleton */}
        <div className="md:hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-slate-100 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-1/3 mt-2"></div>
            </div>
          ))}
        </div>

        {/* Desktop view skeleton */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-slate-200 text-white">
              <tr>
                <th className="px-6 py-4">
                  <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsListSkeleton;
