import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default icon path issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

function App() {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [user, setUser] = useState(null);
  const [advice, setAdvice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/signin");
      } else {
        setUser(currentUser);
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExpenses(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const newExpense = {
        ...formData,
        userId: user.uid,
        createdAt: new Date(),
        location: { latitude, longitude } // Store location data
      };

      try {
        const docRef = await addDoc(collection(db, "expenses"), newExpense);
        setExpenses(prev => [...prev, { id: docRef.id, ...newExpense }]);
        setFormData({ amount: '', date: '', category: '', description: '' });
      } catch (err) {
        console.error("Error adding expense: ", err);
        alert("Failed to add expense. Check console.");
      }
    }, (error) => {
      console.error("Error getting location:", error);
    });
  };

  const filteredExpenses =
    filter === 'All'
      ? expenses
      : expenses.filter(e => e.category === filter);

  const calculateAverageSpending = (expenses) => {
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    return total / expenses.length;
  };

  const averageSpending = calculateAverageSpending(filteredExpenses);

  const fetchAdvice = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/advice');
      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-4">
      <header className="bg-white shadow sticky top-0 z-10 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-indigo-700">💸 Expense Tracker</h1>
          <p className="text-sm text-gray-500">Track your spending smartly</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="text-sm text-blue-500 font-semibold hover:underline"
            onClick={fetchAdvice}
          >
            💬 Get Advice
          </button>
          {user && (
            <button
              className="text-sm text-red-500 font-semibold hover:underline"
              onClick={() => {
                signOut(auth);
                navigate("/signin");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        {advice && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Advice</h2>
            <p className="text-gray-700">{advice}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Add New Expense</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="number" name="amount" placeholder="£50.00"
              value={formData.amount} onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
            <input type="date" name="date" value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
            <input type="text" name="category" placeholder="Category"
              value={formData.category} onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
            <input type="text" name="description" placeholder="Optional note"
              value={formData.description} onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <button type="submit"
              className="w-full bg-black text-white p-3 rounded-xl font-semibold hover:bg-gray-800 transition">
              ➕ Add Expense
            </button>
          </form>

          {expenses.length > 0 && (
            <div className="mt-10">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">Filter by Category:</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-2 border rounded-xl ${filter === 'All' ? 'bg-indigo-400 text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => setFilter('All')}
                  >
                    All
                  </button>
                  {Array.from(new Set(expenses.map(e => e.category))).map((cat, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 border rounded-xl ${filter === cat ? 'bg-indigo-400 text-white' : 'bg-white text-gray-800'}`}
                      onClick={() => setFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-800">📋 Your Expenses</h3>
              <ul className="space-y-4">
                {filteredExpenses.map((expense) => (
                  <li key={expense.id}
                    className="bg-gray-100 p-4 rounded-xl shadow flex justify-between items-start">
                    <div>
                      <p className="text-lg font-bold text-gray-800">£{expense.amount}</p>
                      <p className="text-sm text-gray-600">{expense.category} — {expense.description || 'No description'}</p>
                      <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">📊 Expense Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(
                          filteredExpenses.reduce((acc, exp) => {
                            acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
                            return acc;
                          }, {})
                        ).map(([name, value]) => ({ name, value }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {filteredExpenses.map((_, index) => (
                          <Cell key={index} fill={`hsl(${index * 70}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">💡 Average Spending</h3>
                <p className="text-center text-gray-700">
                  Your average spending per expense is £{averageSpending.toFixed(2)}
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">📍 Expense Locations</h3>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {expenses.map((expense) => (
                    expense.location && (
                      <Marker key={expense.id} position={[expense.location.latitude, expense.location.longitude]}>
                        <Popup>
                          £{expense.amount} spent on {expense.category} <br /> {expense.description}
                        </Popup>
                      </Marker>
                    )
                  ))}
                </MapContainer>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
