"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import hospitalsData from '@/data/hospitals.json'; // Adjust the path based on your file structure
import educationData from '@/data/education.json'; // Adjust path as needed
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";

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
  const [selectedEducation, setSelectedEducation] = useState([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Show video call button for specific emergency type
    if (name === "emergencyType") {
      setShowVideoCall(value === "Medical: Cardiac Arrest");

      // Safely check if educationData exists and is an array
      if (Array.isArray(educationData.data)) {
        const educationBlock = educationData.data.find((item) => item.crisis === value);
        
        console.log("Selected Crisis:", value); // Log selected crisis
        console.log("Crisis Data:", educationBlock); // Log the found crisis data

        if (educationBlock && Array.isArray(educationBlock.videos)) {
          setSelectedEducation(educationBlock.videos);
          console.log("Selected Videos:", educationBlock.videos); // Log the videos found
        } else {
          setSelectedEducation([]);
          console.warn("No videos found for the selected emergency type:", value);
        }
      } else {
        // Handle the case where educationData is not found or incorrectly structured
        setSelectedEducation([]);
        console.error("educationData is not an array or is incorrectly structured");
      }
    }
  };

  const handleCityChange = (e: any) => {
    const city = e.target.value;
    setSelectedCity(city);
    
    const cityData = hospitalsData.find((item) => item.city === city);
    if (cityData) {
      setSelectedHospitals(cityData.hospitals);
    } else {
      setSelectedHospitals([]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const requestData = {
      name: formData.name,
      phoneNumber: formData.number,
      emergencyType: formData.emergencyType,
      city: selectedCity,
      hospital: formData.hospital,
    };
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

  const copyToClipboard = (number: any) => {
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
      <Link href='/registeredUser/optionss'>
        <IoArrowBack size={40} className='text-white bg-red-900 p-2 m-10 rounded-lg font-bold' />
      </Link>
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
                    <div>
                      <h3 className="font-bold">{hospital.name}</h3>
                      <p className="flex items-center">
                        <span 
                          onClick={() => copyToClipboard(hospital.phone)} 
                          className="cursor-pointer text-blue-500 mr-2"
                          title="Copy Phone Number"
                        >
                          📋 
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

          {/* Display Education Block */}
          {selectedEducation.length > 0 ? (
            <div className="mb-4">
              <h2 className="font-bold mb-2">Education:</h2>
              <div className="grid grid-cols-1 gap-4">
                {selectedEducation.map((video, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md">
                    <h3 className="font-bold mb-2">{video.title}</h3>
                    <a
                      href={video.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-red-900 text-white px-4 py-2 rounded-md font-bold"
                    >
                      Watch
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No education videos available for this emergency type.</p>
          )}

          {/* Video Call Option */}
          {showVideoCall && (
            <div className="mb-4">
              <button
                type="button"
                className="w-full bg-red-900 text-white px-4 py-2 rounded-md font-bold"
                onClick={() => console.log('Initiate video call')}
              >
                Initiate Video Call
              </button>
            </div>
          )}

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-red-900 text-white px-4 py-2 rounded-md font-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default dynamic(() => Promise.resolve(EmergencyPage), { ssr: false });
