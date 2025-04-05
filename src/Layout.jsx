export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-700">💸 Expense Tracker</h1>
            <p className="text-sm text-gray-500">Track your spending smartly</p>
          </div>
        </header>
        <main className="max-w-3xl mx-auto p-6 mt-6">
          {children}
        </main>
      </div>
    );
  }
  