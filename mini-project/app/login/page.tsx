'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import ToastNotification from "@/components/ToastNotification";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users");
      const users = await response.json();

      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        setToast({ message: "Login Successful!", type: "success" });
        router.push("/admin");
      } else {
        setToast({ message: "Invalid credentials", type: "error" });
      }
    } catch (error) {
      setToast({ message: "An error occurred", type: "error" });
      console.error("Error logging in:", error);
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="font-poppins flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Welcome Back!
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-white hover:text-red-900 hover:border-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
          </form>
          <button
            onClick={handleRegisterRedirect}
            className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-red-900 text-sm font-medium rounded-md text-red-900 bg-white hover:bg-red-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            Go to Register
          </button>
        </div>

        {toast.message && (
          <ToastNotification message={toast.message} type={toast.type} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
