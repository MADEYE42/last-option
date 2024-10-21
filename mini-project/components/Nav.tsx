"use client"
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiGraduationCapFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import { BsInfoCircleFill } from "react-icons/bs";
import Link from "next/link";

const Nav = () => {
  const [nav, setNav] = useState(false);

  return (
    <div className="w-full font-[Poppins] h-30 items-center p-3 flex justify-between shadow-lg bg-white">
      {/* Logo and Hamburger */}
      <div className="flex items-center justify-between p-3 gap-3">
        <div 
          onClick={() => setNav(!nav)} 
          className="cursor-pointer bg-red-900 rounded-full p-2 text-white lg:hidden"
        >
          <HiOutlineMenuAlt2 size={40} />
        </div>
        <img src='/code.png' alt="logo" width={100} />
      </div>

      {/* Full Menu for larger screens */}
      <div className="hidden lg:flex items-center justify-between gap-3 text-gray-800">
        <ul className="flex justify-between gap-6 text-[18px]">        
          <li className="p-3 hover:bg-gray-300 rounded-md duration-300 cursor-pointer"><Link href="/admin">Admin</Link></li>
          <li className="p-3 hover:bg-gray-300 rounded-md duration-300 cursor-pointer"><Link href='/aboutUs'>About Us</Link></li>
          <li className="underline text-red-900 p-3 hover:font-bold duration-300"><Link href='https://play.google.com/store/games?hl=en'>Try our App</Link></li>
        </ul>
        <button className="bg-red-900 p-3 rounded-md text-white font-bold hover:bg-white hover:text-red-900 duration-300"><Link href='/downApp'>Download App</Link></button>
      </div>

      {/* Background Overlay for mobile menu */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0 lg:hidden"></div>
      ) : ''}

      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white z-10 duration-300 text-[20px]"
            : "fixed top-0 left-[-100%] w-[75%] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <img src='/code.png' alt="logo" className="p-4" width={120} />
        <nav>
          <ul className="flex flex-col p-6 text-gray-800">
            <li className="p-3 flex gap-3 items-center hover:bg-gray-300 rounded-md duration-300 cursor-pointer">
              <IoPeople size={25} />
              <Link href="/admin">Admin</Link>
            </li>
            <li className="p-3 flex gap-3 items-center hover:bg-gray-300 rounded-md duration-300 cursor-pointer">
              <BsInfoCircleFill size={25} />
              <Link href='/aboutUs'>About Us</Link>
            </li>
            
            <li className="p-3 flex gap-3 items-center hover:bg-gray-300 rounded-md duration-300 cursor-pointer">
              <RiMoneyRupeeCircleFill size={25} />
              Donation
            </li>
            <li className="p-3 flex gap-3 items-center">Register your Organisation</li>
            <li className="underline text-red-900 p-3 hover:font-bold duration-300"><Link href='https://play.google.com/store/games?hl=en'>Try our App</Link></li>
            <button className="bg-red-900 p-3 rounded-md text-white font-bold mt-4  hover:bg-white hover:text-red-900 duration-300">
            <Link href='/downApp'>Download App</Link>
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
