"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import hospitalsData from '@/data/hospitals.json'; // Adjust the path based on your file structure
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";


// Emergency Page Component
const EmergencyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    emergencyType: '',
    city: '',
    hospital: '',
  });
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  // Handle form data changes
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Show video call button if a medical emergency is selected
    if (name === 'emergencyType') {
      setShowVideoCall(value === 'Medical: Cardiac Arrest');
    }
  };

  // Handle city selection change
  const handleCityChange = (e:any) => {
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
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const requestData = {
      name: formData.name,
      phoneNumber: formData.number,
      emergencyType: formData.emergencyType,
      city: selectedCity,
      hospital: formData.hospital,
    };

    // Save the data to requests.json
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      console.log('Form submitted successfully:', requestData);
      setFormData({ name: '', number: '', emergencyType: '', city: '', hospital: '' });
      setSelectedHospitals([]);
      setShowVideoCall(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to copy phone number to clipboard
  const copyToClipboard = (number:any) => {
    navigator.clipboard.writeText(number)
      .then(() => {
        alert('Phone number copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className='bg-slate-200'>
        <Nav/>
        <Link href='/registeredUser/optionss'><IoArrowBack size={40} className='text-white bg-red-900 p-2 m-10 rounded-lg font-bold' /></Link>
    <div className="max-w-lg mx-auto m-10 p-6 text-black bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">We are here for you!</h1>
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
        

        {/* Conditionally render the video call button for medical emergencies */}
        {showVideoCall && (
          <button className="bg-black text-white px-4 py-2 mt-4 ml-2 rounded-md">
            Start Video Call
          </button>
        )}
      </form>
    </div>
    <Footer/>
    </div>
  );
};

// Dynamic import to ensure the component is loaded on the client-side
export default dynamic(() => Promise.resolve(EmergencyPage), { ssr: false });
