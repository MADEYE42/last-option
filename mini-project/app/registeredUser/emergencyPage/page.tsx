"use client";
import Link from "next/link";
import React, { useState } from "react";

// List of Mumbai cities for autocomplete
const mumbaiCities = [
  "Andheri",
  "Bandra",
  "Borivali",
  "Dadar",
  "Ghatkopar",
  "Juhu",
  "Kurla",
  "Malad",
  "Mulund",
  "Powai",
  "Thane",
  "Vashi",
  "Worli",
];

const EmergencyPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
    emergencyType: "",
    location: "",
  });

  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showVideoCall, setShowVideoCall] = useState(false);

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Show video call button if medical emergency is selected
    if (name === "emergencyType") {
      setShowVideoCall(value.includes("Medical"));
    }
  };

  // Handle location input changes and filter city list
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      location: value,
    }));

    // Filter Mumbai cities based on input
    const filtered = mumbaiCities.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  // Handle city selection
  const handleCitySelect = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      location: city,
    }));
    setFilteredCities([]); // Clear suggestions once a city is selected
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save the form data as JSON (in localStorage here, but you can use backend if needed)
    const formDataJSON = JSON.stringify(formData);
    console.log("Form Data JSON:", formDataJSON);

    // Simulate saving to local JSON file
    localStorage.setItem("emergencyFormData", formDataJSON);

    alert("Form submitted and data saved!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 text-black bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">Emergency Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
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

        {/* Phone Number Field */}
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

        {/* Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-900"
            required
          />
        </div>

        {/* Custom Location Input with Autocomplete */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            placeholder="Start typing city name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-900"
            required
          />
          {/* Show filtered cities as suggestions */}
          {filteredCities.length > 0 && (
            <ul className="border border-gray-300 rounded-md bg-white mt-1">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Emergency Type Dropdown */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-800 focus:outline-none mb-4"
        ><Link href='/registeredUser/emergencyPage/hospitalPage'>Submit</Link>
          
        </button>

        {/* Conditionally render the video call button for medical emergencies */}
        {showVideoCall && (
          <button className="bg-black text-white px-4 py-2 mt-4 rounded-md">
            Start Video Call
          </button>
        )}
      </form>
    </div>
  );
};

export default EmergencyPage;
