"use client";

import React, { useState, useEffect } from "react";
import users from "@/data/users.json";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";
import io from "socket.io-client"; // Import socket.io-client

interface User {
  name: string;
  number: string;
  address: string;
  documentPath: string;
}

const socket = io("http://localhost:3001"); // Connect to the backend server

const Admin = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [callID, setCallID] = useState<string | null>(null); // Video call notification state

  // Register admin when the component mounts
  useEffect(() => {
    socket.emit("register-admin"); // Register the admin

    // Listen for video call notifications
    const handleIncomingCall = (receivedCallID: string) => {
      console.log("Incoming call with ID:", receivedCallID);
      setCallID(receivedCallID); // Set the call ID for the admin to join
    };

    socket.on("notify-admin", handleIncomingCall);

    return () => {
      socket.off("notify-admin", handleIncomingCall); // Cleanup listener when the component unmounts
    };
  }, []);

  // Function to read the document based on file type
  const readDocument = async (path: string, index: number) => {
    try {
      const fileExtension = path.split(".").pop()?.toLowerCase();

      let content;
      if (fileExtension === "txt") {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        content = await response.text();
        setDocumentType("text");
      } else if (["png", "jpg", "jpeg"].includes(fileExtension || "")) {
        content = path; // Set image path directly for display
        setDocumentType("image");
      } else if (fileExtension === "pdf") {
        content = path; // Set PDF path for embedding
        setDocumentType("pdf");
      } else {
        throw new Error("Unsupported document type");
      }

      setDocumentContent(content);
      setSelectedUserIndex(index); // Set selected user index to display document
    } catch (error: any) {
      console.error(error);
      alert("Error reading document: " + error.message);
    }
  };

  // Function to close the document
  const closeDocument = () => {
    setSelectedUserIndex(null); // Collapse the document viewer
    setDocumentContent(null); // Clear document content
  };

  // Function to join the video call
  const joinCall = () => {
    if (callID) {
      const callURL = `${window.location.origin}/videoCall?roomID=${callID}`;
      window.location.href = callURL; // Redirect admin to the video call URL
      console.log(`Admin joining call with ID: ${callID}`);
      alert(`Joining video call with ID: ${callID}`);
      // Reset callID after joining to prevent repeated notifications
      setCallID(null);
    }
  };

  return (
    <div>
      <AdminNav />

      <div className="flex flex-col md:flex-row min-h-screen bg-slate-200 p-6 text-black transition-all duration-300">
        {/* User List Section */}
        <div
          className={`bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 ${
            selectedUserIndex !== null && "md:w-1/5"
          } transition-all duration-300`}
        >
          <h1 className="text-2xl font-black mb-4">User Details</h1>

          {users.map((user: User, index: number) => (
            <div key={index} className="bg-slate-200 p-4 rounded-lg shadow mb-4">
              <h2 className="font-bold">{user.name}</h2>
              <p>Number: {user.number}</p>
              <p>Address: {user.address}</p>
              <button
                onClick={() => readDocument(user.documentPath, index)}
                className="mt-4 bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
              >
                Read Document
              </button>

              {/* On mobile, show the document below the card */}
              {selectedUserIndex === index && (
                <DocumentViewer
                  documentContent={documentContent}
                  documentType={documentType}
                  closeDocument={closeDocument}
                />
              )}
            </div>
          ))}
        </div>

        {/* Document Section (Visible on larger screens) */}
        {selectedUserIndex !== null && (
          <div className="hidden md:block md:w-4/5 bg-white p-6 rounded-lg shadow-lg ml-4">
            <DocumentViewer
              documentContent={documentContent}
              documentType={documentType}
              closeDocument={closeDocument}
            />
          </div>
        )}

        {/* Video Call Notification Section */}
        {callID && (
          <div className="bg-yellow-100 p-4 rounded-lg shadow-lg mt-6 md:mt-0 md:ml-4">
            <h2 className="text-xl font-bold text-red-900 mb-4">Incoming Video Call</h2>
            <p>Call ID: {callID}</p>
            <button
              onClick={joinCall}
              className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-200"
            >
              Join Call
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

// Separate DocumentViewer component for better modularity
const DocumentViewer = ({
  documentContent,
  documentType,
  closeDocument,
}: {
  documentContent: string | null;
  documentType: string | null;
  closeDocument: () => void;
}) => (
  <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold">Document Content:</h3>
      <button
        onClick={closeDocument}
        className="bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
      >
        Close Document
      </button>
    </div>

    {documentType === "text" && <pre className="text-wrap">{documentContent}</pre>}
    {documentType === "image" && <img src={documentContent!} alt="Document" className="max-w-full h-auto" />}
    {documentType === "pdf" && (
      <embed src={documentContent!} type="application/pdf" className="w-full h-[600px]" />
    )}
  </div>
);

export default Admin;
