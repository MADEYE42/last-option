"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import hospitalsData from '@/data/hospitals.json'; // Adjust the path based on your file structure

// Emergency Page Component
const EmergencyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    emergencyType: '',
    location: '',
  });
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Show video call button if medical emergency is selected
    if (name === 'emergencyType') {
      setShowVideoCall(value === 'Medical: Cardiac Arrest');
    }
  };

  // Handle city selection change
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    
    // Find hospitals for the selected city
    const cityData = hospitalsData.find((item) => item.city === city);
    if (cityData) {
      setSelectedHospitals(cityData.hospitals);
    } else {
      setSelectedHospitals([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Function to copy phone number to clipboard
  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number)
      .then(() => {
        alert('Phone number copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 text-black bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">Emergency Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-900"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Emergency Type:</label>
          <select
            name="emergencyType"
            value={formData.emergencyType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-900"
            required
          >
            <option value="">Select Emergency Type</option>
            <option value="Medical: Cardiac Arrest">Medical: Cardiac Arrest</option>
            <option value="Medical: Fall Victim">Medical: Fall Victim</option>
            <option value="Medical: Head Injury">Medical: Head Injury</option>
            <option value="Vehicle: Vehicle Breakdown">Vehicle: Vehicle Breakdown</option>
            <option value="Fire: Fire Alarm">Fire: Fire Alarm</option>
          </select>
        </div>

        {/* City Selector */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Select City:</label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-900"
            required
          >
            <option value="">Select a city</option>
            {hospitalsData.map((cityData) => (
              <option key={cityData.city} value={cityData.city}>
                {cityData.city}
              </option>
            ))}
          </select>
        </div>

        {/* Display Hospitals */}
        {selectedHospitals.length > 0 && (
          <div className="mb-4">
            <h2 className="font-bold mb-2">Nearby Hospitals:</h2>
            <div className="grid grid-cols-1 gap-4">
              {selectedHospitals.map((hospital) => (
                <div key={hospital.name} className="p-4 border border-gray-300 rounded-md flex items-center">
                  <img
                    src={hospital.imageUrl}
                    alt={hospital.name}
                    className="w-16 h-16 rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{hospital.name}</h3>
                    <p className="flex items-center">
                      <span 
                        onClick={() => copyToClipboard(hospital.phone)} 
                        className="cursor-pointer text-blue-500 mr-2"
                        title="Copy Phone Number"
                      >
                        📋 {/* Copy icon, can be replaced with an icon library */}
                      </span>
                      {hospital.phone}
                    </p>
                    <p>{hospital.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-800 focus:outline-none mb-4"
        >
          Submit
        </button>

        {/* Conditionally render the video call button for medical emergencies */}
        {showVideoCall && (
          <button className="bg-black text-white px-4 py-2 mt-4 ml-2 rounded-md">
            Start Video Call
          </button>
        )}
      </form>
    </div>
  );
};

// Dynamic import to ensure the component is loaded on the client-side
export default dynamic(() => Promise.resolve(EmergencyPage), { ssr: false });
