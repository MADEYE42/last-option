"use client"
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Link from 'next/link';
import React, { useState } from 'react';

function optionss() {
  const [blur, setBlur] = useState(false);

  const handleClick = () => {
    setBlur(!blur);
  };

  return (
    <div>

    <Nav/>
    <div className="min-h-screen bg-[url('/emergency.jpg')] bg-cover bg-center flex items-center justify-center shadow-lg">
      <div className={`w-full h-full absolute inset-0 ${blur ? 'backdrop-blur-md' : ''}`}></div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between w-full max-w-4xl p-6 space-y-4 md:space-y-0">
        <Link href='/registeredUser/emergencyPage'>
        <div
          className="flex-1 bg-red-900 text-white rounded-lg p-10 text-center cursor-pointer hover:shadow-lg hover:opacity-90 transition-opacity"
          onClick={handleClick}
        >
          <h2 className="text-3xl font-bold">Emergency </h2>
          <p className="mt-4">Click here for emergency services</p>
        </div>
        </Link>
        <div className="w-4"></div> {/* Spacer between two sections */}
        <Link href='/registeredUser/educationPage'>
        <div
          className="flex-1 bg-black text-white rounded-lg p-10 text-center cursor-pointer hover:shadow-lg hover:opacity-90 transition-opacity"
          onClick={handleClick}
        >
          <h2 className="text-3xl font-bold">Education</h2>
          <p className="mt-4">Click here if you are a Education</p>
        </div>
        </Link>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
}

export default optionss;
