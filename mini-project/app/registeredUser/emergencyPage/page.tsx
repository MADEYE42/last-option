"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [selectedCrisisVideos, setSelectedCrisisVideos] = useState([]);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null); // Reference for the webcam video
  const doctorVideoRef = useRef(null); // Reference for the doctor's video

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
  const selectCrisis = (crisis) => {
    const crisisData = data.find((item) => item.crisis === crisis);
    if (crisisData) {
      setSelectedCrisisVideos(crisisData.videos);
      setCurrentVideoIndex(0); // Reset to the first video
      setVideoModalVisible(true); // Open the video modal
    }
  };

  const handleHospitalChange = (e) => {
    const selectedHospitalName = e.target.value;
    const selectedHospital = selectedHospitals.find(
      (hospital) => hospital.name === selectedHospitalName
    );

    if (selectedHospital) {
      const phoneNumber = selectedHospital.phone;

      // Copy phone number to clipboard
      copyToClipboard(phoneNumber);

      // Direct the user to their phone's dialer
      window.open(`tel:${phoneNumber}`, "_self");

      // Update form data with selected hospital
      setFormData((prev) => ({
        ...prev,
        hospital: selectedHospitalName,
      }));
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

  const startVideoCall = () => {
    setIsVideoCallActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        if (doctorVideoRef.current) {
          doctorVideoRef.current.src =
            "/videos/DOCTOR - ZOOM CALL WITH PATIENT.mp4"; // Ensure this path is correct
          doctorVideoRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };

  const endVideoCall = () => {
    setIsVideoCallActive(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-10 rounded-lg max-w-lg w-full border border-gray-300"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Emergency Form
          </h1>
          <label className="block mb-4">
            <span className="text-lg font-medium text-gray-700">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-lg font-medium text-gray-700">
              Phone Number:
            </span>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your phone number"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-lg font-medium text-gray-700">
              Emergency Type:
            </span>
            <select
              name="emergencyType"
              value={formData.emergencyType}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            >
              <option value="">Select Emergency Type</option>
              <option value="Medical: Cardiac Arrest">
                Medical: Cardiac Arrest
              </option>
              <option value="Medical: Fall Victim">Medical: Fall Victim</option>
              <option value="Vehicle: Vehicle Breakdown">
                Vehicle: Vehicle Breakdown
              </option>
              <option value="Fire: Fire Alarm">Fire: Fire Alarm</option>
            </select>
          </label>
          {showVideoCall && (
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                Start Video Call:
              </h2>
              <button
                type="button"
                onClick={startVideoCall}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
              >
                Start Video Call
              </button>
            </div>
          )}
          {showVideoCall && selectedEducation.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                Related Videos:
              </h2>
              <ul className="space-y-2">
                {selectedEducation.map((video, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => openVideoModal(index)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
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
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            >
              <option value="">Select City</option>
              {hospitalsData.map((item, index) => (
                <option key={index} value={item.city}>
                  {item.city}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-lg font-medium text-gray-700">Hospital:</span>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleHospitalChange} // Use the new handler here
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            >
              <option value="">Select Hospital</option>
              {selectedHospitals.map((hospital, index) => (
                <option key={index} value={hospital.name}>
                  {hospital.name} - {hospital.phone}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      {/* Video Modal */}
      {videoModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">
              Video: {selectedEducation[currentVideoIndex].title}
            </h2>
            <video
              width="100%"
              height="315"
              controls
              src={selectedEducation[currentVideoIndex].videoLink}
              onError={handleVideoError}
            />
            {videoError && (
              <p className="text-red-500 mt-2">
                Video failed to load. Please try another.
              </p>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={closeVideoModal}
                className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={playNextVideo}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Next Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Call Section */}
      {isVideoCallActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-40">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Video Call in Progress</h2>
            <video
              ref={videoRef}
              className="w-full rounded-lg mb-4"
              autoPlay
              playsInline
            />
            <video
              ref={doctorVideoRef}
              className="w-full rounded-lg mb-4 " // Hide the doctor's video by default
              autoPlay
              playsInline
            />
            <button
              onClick={endVideoCall}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              End Call
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EmergencyPage;
