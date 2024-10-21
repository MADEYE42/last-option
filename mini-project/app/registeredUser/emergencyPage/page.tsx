"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import hospitalsData from "@/data/hospitals.json";
import educationData from "@/data/education.json";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const EmergencyPage = ({ fromRegisterPage }) => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        emergencyType: "",
        city: "",
        hospital: "",
    });
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedHospitals, setSelectedHospitals] = useState([]);
    const [selectedEducation, setSelectedEducation] = useState([]);
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        if (fromRegisterPage) {
            const savedName = localStorage.getItem("name");
            const savedNumber = localStorage.getItem("number");
            setFormData((prev) => ({
                ...prev,
                name: savedName || "",
                number: savedNumber || "",
            }));
        }
    }, [fromRegisterPage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "emergencyType") {
            setShowVideoCall(value.startsWith("Medical:"));

            const educationBlock = educationData.data.find(
                (item) => item.crisis === value
            );
            if (educationBlock && Array.isArray(educationBlock.videos)) {
                setSelectedEducation(educationBlock.videos);
            } else {
                setSelectedEducation([]);
            }
        }
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);

        const cityData = hospitalsData.find((item) => item.city === city);
        if (cityData) {
            setSelectedHospitals(cityData.hospitals);
        } else {
            setSelectedHospitals([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            name: formData.name,
            phoneNumber: formData.number,
            emergencyType: formData.emergencyType,
            city: selectedCity,
            hospital: formData.hospital,
        };

        try {
            const response = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Failed to save data");
            }

            console.log("Form submitted successfully:", requestData);
            setFormData({
                name: "",
                number: "",
                emergencyType: "",
                city: "",
                hospital: "",
            });
            setSelectedHospitals([]);
            setShowVideoCall(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const copyToClipboard = (number) => {
        navigator.clipboard
            .writeText(number)
            .then(() => {
                alert("Phone number copied to clipboard!");
            })
            .catch((err) => {
                console.error("Could not copy text: ", err);
            });
    };

    const openVideoModal = (index) => {
        setCurrentVideoIndex(index);
        setVideoModalVisible(true);
        setVideoError(false);
    };

    const closeVideoModal = () => {
        setVideoModalVisible(false);
        setCurrentVideoIndex(0);
        setVideoError(false);
    };

    const playNextVideo = () => {
        if (currentVideoIndex < selectedEducation.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
            setVideoError(false);
        } else {
            closeVideoModal();
        }
    };

    const handleVideoError = () => {
        setVideoError(true);
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-slate-200 min-h-screen flex flex-col">
            <Nav />
            <Link href="/registeredUser/options">
                <IoArrowBack
                    size={40}
                    className="text-white bg-red-600 p-2 m-10 rounded-lg shadow-md cursor-pointer hover:bg-red-500"
                    aria-label="Go back"
                />
            </Link>
            <div className="flex flex-col items-center justify-center py-12">
                <form onSubmit={handleSubmit} className="bg-white shadow-md p-10 rounded-lg max-w-lg w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Emergency Form</h1>
                    <label className="block mb-4">
                        <span className="text-lg font-medium text-gray-700">Name:</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-lg font-medium text-gray-700">Phone Number:</span>
                        <input
                            type="tel"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-lg font-medium text-gray-700">Emergency Type:</span>
                        <select
                            name="emergencyType"
                            value={formData.emergencyType}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Emergency Type</option>
                            <option value="Medical: Cardiac Arrest">Medical: Cardiac Arrest</option>
                            <option value="Medical: Fall Victim">Medical: Fall Victim</option>
                            <option value="Vehicle: Vehicle Breakdown">Vehicle: Vehicle Breakdown</option>
                            <option value="Fire: Fire Alarm">Fire: Fire Alarm</option>
                        </select>
                    </label>
                    {showVideoCall && selectedEducation.length > 0 && (
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-gray-700 mb-2">Related Videos:</h2>
                            <ul className="space-y-2">
                                {selectedEducation.map((video, index) => (
                                    <li key={index}>
                                        <button
                                            type="button"
                                            onClick={() => openVideoModal(index)}
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
                                        >
                                            {video.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <label className="block mb-4">
                        <span className="text-lg font-medium text-gray-700">City:</span>
                        <select
                            name="city"
                            value={selectedCity}
                            onChange={handleCityChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select City</option>
                            {hospitalsData.map((city, index) => (
                                <option key={index} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="text-lg font-medium text-gray-700">Hospital:</span>
                        <select
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Hospital</option>
                            {selectedHospitals.map((hospital, index) => (
                                <option key={index} value={hospital}>
                                    {hospital}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg shadow transition-colors"
                    >
                        Submit
                    </button>
                </form>
                {videoModalVisible && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
                            <iframe
                                src={selectedEducation[currentVideoIndex].videoLink}
                                title={selectedEducation[currentVideoIndex].title}
                                frameBorder="0"
                                allowFullScreen
                                className="w-full h-64 rounded-md"
                                onError={handleVideoError}
                            />
                            {videoError && <p className="text-red-500 mt-2">Error loading video. Please try again.</p>}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={playNextVideo}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    {currentVideoIndex < selectedEducation.length - 1
                                        ? "Next Video"
                                        : "Close"}
                                </button>
                                <button
                                    onClick={closeVideoModal}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default EmergencyPage;
