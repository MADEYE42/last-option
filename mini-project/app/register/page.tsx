'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToastNotification from '@/components/ToastNotification';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setToastMessage('Registration successful');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setToastMessage('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setToastMessage('Error during registration');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-[Poppins]">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Create your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        {toastMessage && (
          <ToastNotification message={toastMessage} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
