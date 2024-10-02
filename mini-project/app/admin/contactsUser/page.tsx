"use client"
// app/page.tsx
import React, { useState } from 'react';
import contactsData from '@/data/contacts.json';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AdminNav from '@/components/AdminNav';

interface Contact {
  id: number;
  name: string;
  contact_no: string;
  state: string;
  Cities: string;
  suburb: string;
  crisis: string;
}

const contactsUser = () => {
  const [crisisFilter, setCrisisFilter] = useState('');
  const [suburbFilter, setSuburbFilter] = useState('');

  // Sort and filter contacts based on crisis and suburb
  const filteredContacts = contactsData
    .filter(contact =>
      contact.crisis.toLowerCase().includes(crisisFilter.toLowerCase()) &&
      contact.suburb.toLowerCase().includes(suburbFilter.toLowerCase())
    )
    .sort((a: Contact, b: Contact) => {
      if (a.state.localeCompare(b.state) !== 0) {
        return a.state.localeCompare(b.state);
      }
      if (a.crisis.localeCompare(b.crisis) !== 0) {
        return a.crisis.localeCompare(b.crisis);
      }
      return a.suburb.localeCompare(b.suburb);
    });

  // Function to copy contact information to clipboard
  const copyToClipboard = (contact: Contact) => {
    const contactInfo = `Name: ${contact.name}\nContact No: ${contact.contact_no}\nState: ${contact.state}\nCity: ${contact.Cities}\nSuburb: ${contact.suburb}\nCrisis: ${contact.crisis}`;
    navigator.clipboard.writeText(contactInfo)
      .then(() => {
        alert('Contact information copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div>
      <AdminNav/>
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-200 p-6 text-black font-[Poppins]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <h1 className="text-2xl font-black mb-4">Contact List</h1>
        
        {/* Input fields for filtering */}
        <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Filter by Crisis"
            value={crisisFilter}
            onChange={e => setCrisisFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
          />
          <input
            type="text"
            placeholder="Filter by Suburb"
            value={suburbFilter}
            onChange={e => setSuburbFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
          />
        </div>

        {/* Grid layout for contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div key={contact.id} className="bg-slate-50 p-4 rounded-lg shadow hover:bg-slate-300 transition duration-200 ">
                <h2 className="font-bold">{contact.name}</h2>
                <p>Contact No: {contact.contact_no}</p>
                <p>State: {contact.state}</p>
                <p>City: {contact.Cities}</p>
                <p>Suburb: {contact.suburb}</p>
                <p>Crisis: {contact.crisis}</p>
                <button
                  onClick={() => copyToClipboard(contact)}
                  className="mt-4 bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                >
                  Copy Info
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center">No contacts found.</p>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default contactsUser;
