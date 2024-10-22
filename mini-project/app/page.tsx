"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCall, IoPerson, IoHelpCircle } from "react-icons/io5";

function Page() {
  const [blur, setBlur] = useState(false);

  const handleClick = () => {
    setBlur(!blur);
  };

  return (
    <div>
      <div className="min-h-screen bg-[url('/emergency.jpg')] bg-cover bg-center flex items-center justify-center relative">
        <div
          className={`w-full h-full absolute inset-0 ${
            blur ? "backdrop-blur-md" : ""
          }`}
        ></div>
        <motion.div
          className="relative z-10 flex flex-col justify-center items-center text-center p-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-extrabold text-black mb-2">
            Crisis Call
          </h1>
          <p className="text-2xl font-semibold text-black mb-6 ">
            Your immediate help is just a call away!
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-md">
            <h2 className="text-xl font-semibold text-black mb-4">Features:</h2>
            <ul className="text-left text-black space-y-2">
              <li>🎥 Video Call Assistance</li>
              <li>🏥 Nearby Hospitals Information</li>
              <li>📚 Video Education on Specific Emergencies</li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl space-y-4 md:space-y-0">
            <Link href="/registeredUser/emergencyPage">
              <motion.div
                className="flex-1 bg-red-900 text-white rounded-lg p-10 text-center cursor-pointer hover:shadow-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoHelpCircle size={40} />
                <h2 className="text-2xl font-bold mt-2">In Emergency</h2>
                <p className="mt-4">Click here for emergency services</p>
              </motion.div>
            </Link>
            <Link href="/registeredUser">
              <motion.div
                className="flex-1 bg-white border border-gray-300 text-black rounded-lg p-10 text-center cursor-pointer hover:shadow-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoPerson size={40} />
                <h2 className="text-2xl font-bold mt-2">Registered User</h2>
                <p className="mt-4">Click here if you are a registered user</p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
