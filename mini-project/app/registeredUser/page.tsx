"use client";
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Link from 'next/link';
import React, { useState } from 'react';

const RegisteredUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    document: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: any) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.document) {
      alert("Please upload a document.");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('number', formData.number);
    data.append('address', formData.address);
    data.append('document', formData.document);

    try {
      // Send the request to the correct backend server URL (port 5000)
      const response = await fetch('http://localhost:5000/api/saveUserData', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again later.');
    }
  };

  return (
    <div className='bg-white'>
      <Nav />
      <div className="max-w-md mx-auto  p-6 bg-gray-200 rounded-md shadow-lg text-black m-10">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload Document:</label>
            <input
              type="file"
              name="document"
              onChange={handleFileChange}
              className="w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-800 focus:outline-none"
          ><Link href='/registeredUser/emergencyPage'>Submit</Link>            
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisteredUser;
