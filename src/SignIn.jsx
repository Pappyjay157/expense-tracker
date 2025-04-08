import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return alert("Please enter your email above first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-blue-200 mx-4 sm:mx-0">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          Welcome Back <span className="animate-pulse">👋</span>
        </h2>

        <form onSubmit={handleSignin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-blue-200 rounded-xl text-black placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-blue-200 rounded-xl text-black placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleResetPassword}
              className="mt-2 text-sm text-blue-600 hover:underline float-right bg-white shadow-none px-0 py-0"
            >
              Forgot password?
            </button>
          </div>

          <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Sign In
            </button>

        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
