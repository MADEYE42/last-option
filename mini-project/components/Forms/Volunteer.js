// Use client directive since this is client-side code
"use client";

import React, { useState } from 'react';

const Volunteerr = () => {
  const [formData, setFormData] = useState({
    photo: '',
    name: '',
    phone: '',
    state: '',
    city: '',
    suburb: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Form data saved successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData);  // Log error details
        alert('Failed to save data. See console for details.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to save data. Check the console for more information.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <form 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-black mb-4">User Form</h2>
        
        {/* Photo */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="photo">
            Photo URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="photo"
            name="photo"
            type="text"
            value={formData.photo}
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* Suburb */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="suburb">
            Suburb
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="suburb"
            name="suburb"
            type="text"
            value={formData.suburb}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Volunteerr;
