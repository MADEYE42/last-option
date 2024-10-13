"use client";
import React from "react";

const VideoCall = () => {
  const endCall = () => {
    // Logic to end the call goes here
    // Redirect back to the emergency page after ending the call
    window.location.href = "/emergency"; // Use window.location for navigation
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Video Call in Progress...</h1>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Video component goes here */}
        <div className="bg-gray-300 h-64 rounded-lg mb-4">
          {/* Placeholder for video stream */}
          <p className="text-center py-20">Video Stream</p>
        </div>
        <button
          onClick={endCall}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-bold"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
