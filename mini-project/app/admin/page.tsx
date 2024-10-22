"use client";

import React, { useState, useEffect } from "react";
import users from "@/data/users.json";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";
import io from "socket.io-client";

// Define types for users and notifications
interface User {
  name: string;
  number: string;
  address: string;
  document: string; // Updated to match the key in your JSON data
}

interface Notification {
  type: "donation" | "call";
  message: string;
  roomID?: string;
}

// Connect to socket server
const socket = io("http://localhost:3001", {
  withCredentials: true,
});

const Admin = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Check if the user is logged in on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // Redirect to login page if not authenticated
      window.location.href = "/login";
    }

    console.log("Attempting to connect to socket");

    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    // Listen for notifications from the server
    socket.on("notify-admin", (data: Notification) => {
      console.log("Notification received:", data);
      setNotification(data);
    });

    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("notify-admin");
      socket.off("connect");
    };
  }, []);

  const readDocument = async (path: string | undefined, index: number) => {
    if (!path) {
      alert("Document path is missing!");
      return;
    }

    try {
      const fileExtension = path.split(".").pop()?.toLowerCase();

      // Adjust the path for static files
      const staticPath = `/uploads/${path}`; // Directly use the document filename from your data

      let content;
      if (fileExtension === "txt") {
        const response = await fetch(staticPath);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        content = await response.text();
        setDocumentType("text");
      } else if (["png", "jpg", "jpeg"].includes(fileExtension || "")) {
        content = staticPath;
        setDocumentType("image");
      } else if (fileExtension === "pdf") {
        content = staticPath;
        setDocumentType("pdf");
      } else {
        throw new Error("Unsupported document type");
      }

      setDocumentContent(content);
      setSelectedUserIndex(index);
    } catch (error: any) {
      console.error(error);
      alert("Error reading document: " + error.message);
    }
  };

  const closeDocument = () => {
    setSelectedUserIndex(null);
    setDocumentContent(null);
  };

  const joinCall = () => {
    if (notification && notification.type === "call" && notification.roomID) {
      const callURL = `${window.location.origin}/videoCall?roomID=${notification.roomID}`;
      window.open(callURL, "_blank");
      setNotification(null); // Clear notification after opening call
    }
  };

  return (
    <div>
      <AdminNav />

      <div className="flex flex-col md:flex-row min-h-screen bg-slate-200 p-6 text-black transition-all duration-300">
        {/* User List Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 transition-all duration-300">
          <h1 className="text-2xl font-black mb-4">User Details</h1>
          {users.map((user: User, index: number) => (
            <div
              key={index}
              className="bg-slate-200 p-4 rounded-lg shadow mb-4"
            >
              <h2 className="font-bold">{user.name}</h2>
              <p>Number: {user.number}</p>
              <p>Address: {user.address}</p>
              <button
                onClick={() => readDocument(user.document, index)} // Ensure document key matches
                className="mt-4 bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
              >
                Read Document
              </button>
            </div>
          ))}
        </div>

        {/* Document Preview Section */}
        {selectedUserIndex !== null && documentContent && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6 md:mt-0 md:ml-4 w-full md:w-2/3 transition-all duration-300">
            <h2 className="text-xl font-bold mb-4">Document Preview</h2>
            {documentType === "text" && <pre>{documentContent}</pre>}
            {documentType === "image" && (
              <img
                src={documentContent}
                alt="User Document"
                className="max-w-full h-auto"
              />
            )}
            {documentType === "pdf" && (
              <iframe
                src={documentContent}
                className="w-full h-96"
                title="PDF Document"
              />
            )}
            <button
              onClick={closeDocument}
              className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500 transition duration-200"
            >
              Close Document
            </button>
          </div>
        )}

        {/* Notification Section */}
        {notification && (
          <div className="bg-yellow-100 p-4 rounded-lg shadow-lg mt-6 md:mt-0 md:ml-4">
            <h2 className="text-xl font-bold text-red-900 mb-4">
              {notification.type === "call"
                ? "Incoming Video Call"
                : "New Donation Request"}
            </h2>
            <p>{notification.message}</p>
            {notification.type === "call" && (
              <button
                onClick={joinCall}
                className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-200"
              >
                Join Call
              </button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
