"use client";
import React, { useState } from "react";
import users from "@/data/users.json";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";

interface User {
  name: string;
  number: string;
  address: string;
  documentPath: string;
}

const Admin = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);

  const readDocument = async (path: string, index: number) => {
    try {
      const fileExtension = path.split(".").pop()?.toLowerCase();

      if (fileExtension === "txt") {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const text = await response.text();
        setDocumentContent(text);
        setDocumentType("text");
      } else if (["png", "jpg", "jpeg"].includes(fileExtension || "")) {
        setDocumentContent(path); // Set image path directly for display
        setDocumentType("image");
      } else if (fileExtension === "pdf") {
        setDocumentContent(path); // Set PDF path for embedding
        setDocumentType("pdf");
      } else {
        throw new Error("Unsupported document type");
      }

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

  return (
    <div>
      <AdminNav />

      <div className={`flex flex-col md:flex-row min-h-screen bg-slate-200 p-6 text-black transition-all duration-300`}>
        {/* User List Section */}
        <div className={`bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 ${selectedUserIndex !== null && "md:w-1/5"} transition-all duration-300`}>
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
                <div className="mt-4 bg-white p-4 rounded-lg shadow-lg md:hidden">
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
                  {documentType === "image" && <img src={documentContent} alt="Document" className="w-full h-auto" />}
                  {documentType === "pdf" && (
                    <iframe
                      src={documentContent}
                      className="w-full h-[500px] md:h-full"
                      title="PDF Document"
                      frameBorder="0"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Document Section (Visible on larger screens) */}
        {selectedUserIndex !== null && (
          <div className="hidden md:block md:w-4/5 bg-white p-6 rounded-lg shadow-lg ml-4">
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
            {documentType === "image" && <img src={documentContent} alt="Document" className="w-full h-auto" />}
            {documentType === "pdf" && (
              <iframe
                src={documentContent}
                className="w-full h-[500px] md:h-full"
                title="PDF Document"
                frameBorder="0"
              />
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
