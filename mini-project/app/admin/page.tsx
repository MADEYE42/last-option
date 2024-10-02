"use client"
import React, { useState } from 'react';
import users from '@/data/users.json';
import Footer from '@/components/Footer';
import AdminNav from '@/components/AdminNav';

interface User {
  name: string;
  number: string;
  address: string;
  documentPath: string;
}

const admin = () => {
  const [documentContent, setDocumentContent] = useState<string | null>(null);

  const readDocument = async (path: string) => {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error('Failed to fetch document');
      }
      const text = await response.text();
      setDocumentContent(text);
    } catch (error) {
      console.error(error);
      alert('Error reading document: ' + error.message);
    }
  };

  return (
    <div>
        <AdminNav/>
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-200 p-6 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-black mb-4">User Details</h1>
        
        {users.map((user: User, index: number) => (
          <div key={index} className="bg-slate-200 p-4 rounded-lg shadow mb-4">
            <h2 className="font-bold">{user.name}</h2>
            <p>Number: {user.number}</p>
            <p>Address: {user.address}</p>
            <button
              onClick={() => readDocument(user.documentPath)}
              className="mt-4 bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
            >
              Read Document
            </button>
          </div>
        ))}

        {/* Display the document content if available */}
        {documentContent && (
          <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow">
            <h3 className="font-bold mb-2">Document Content:</h3>
            <pre className='text-wrap'>{documentContent}</pre>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default admin;
