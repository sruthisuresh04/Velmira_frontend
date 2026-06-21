import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${backendUrl}/api/user/register`, {
      name,
      email,
      password,
    });

    if (res.data.success) {
      alert("Registration Successful");
      navigate("/");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-400">
              Join us to start renting luxury jewellery
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-300">
                Full Name
              </span>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-300">
                Email Address
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-300">
                Password
              </span>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-yellow-500 px-6 py-3 text-black font-semibold transition hover:bg-yellow-400 mt-6"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
