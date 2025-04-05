import { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { ...formData, id: Date.now() };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setFormData({ amount: '', date: '', category: '', description: '' });
  };

  const filteredExpenses = filter === 'All'
    ? expenses
    : expenses.filter(e => e.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">💸 Expense Tracker</h1>
          <p className="text-sm text-gray-500">Track your spending smartly</p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto p-6 mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Add New Expense</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="number" name="amount" placeholder="Amount"
              value={formData.amount} onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400" required />
            <input type="date" name="date" value={formData.date}
              onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400" required />
            <input type="text" name="category" placeholder="Category"
              value={formData.category} onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400" required />
            <input type="text" name="description" placeholder="Description"
              value={formData.description} onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400" />
            <button type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700">➕ Add Expense</button>
          </form>

          {expenses.length > 0 && (
            <div className="mt-10">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">Filter by Category:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400">
                  <option value="All">All</option>
                  {Array.from(new Set(expenses.map(e => e.category))).map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-800">📋 Your Expenses</h3>
              <ul className="space-y-4">
                {filteredExpenses.map((expense) => (
                  <li key={expense.id}
                    className="bg-gray-100 p-4 rounded-xl shadow flex justify-between items-start">
                    <div>
                      <p className="text-lg font-bold text-gray-800">₦{expense.amount}</p>
                      <p className="text-sm text-gray-600">{expense.category} — {expense.description || 'No description'}</p>
                      <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
