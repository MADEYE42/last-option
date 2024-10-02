"use client"
import React from 'react'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
  } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
        <footer className="bg-red-900 text-gray-300 py-10 px-5 font-[Poppins]">
        {/* Main Grid for Contact Info, Social Contacts, and Quick Links */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Contact Info</h2>
            <p>Email: contact@example.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123, Some Street, City, Country</p>
          </div>

          {/* Social Contacts */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">
              Social Contacts
            </h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebookF size={25} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter size={25} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaLinkedinIn size={25} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram size={25} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/home" className="hover:text-red-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-red-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-red-500">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>
            <a href="/terms" className="hover:text-red-500">
              Terms and Conditions
            </a>{" "}
            | All Rights Reserved &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
  
    </div>
  )
}

export default Footer