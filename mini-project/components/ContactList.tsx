"use client"
import { useState, useEffect } from 'react';

type Contact = {
  id: number;
  name: string;
  contact_no: string;
  gender: string;
  expense: number;
  crisis: string;
};

const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [crisisFilter, setCrisisFilter] = useState<string>('');

  useEffect(() => {
    import('@/data/contacts.json').then((module) => {
      const data = module.default; // Access the default export if it's a module
      console.log('Contacts:', data);
      if (Array.isArray(data)) {
        setContacts(data);
        setFilteredContacts(data); // Initialize with all contacts
      } else {
        console.error('Expected an array of contacts, but got:', data);
      }
    });
  }, []);
  

  // Handle filter change
  const handleCrisisFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrisisFilter(e.target.value);
  };

  // Filter contacts based on the crisis input
  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.crisis.toLowerCase().includes(crisisFilter.trim().toLowerCase())
    );

    console.log('Filtered Contacts:', filtered); // Debugging: Log the filtered contacts
    setFilteredContacts(filtered);
  }, [crisisFilter, contacts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts List</h1>
      
      <div className="flex space-x-4 mb-4">
        {/* Crisis Filter */}
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          name="crisis"
          placeholder="Filter by Crisis"
          value={crisisFilter}
          onChange={handleCrisisFilterChange}
        />
      </div>

      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Contact No.</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Expense</th>
            <th className="py-2 px-4">Crisis</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredContacts) && filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <tr key={contact.id} className="border-b">
                <td className="py-2 px-4">{contact.name}</td>
                <td className="py-2 px-4">{contact.contact_no}</td>
                <td className="py-2 px-4">{contact.gender}</td>
                <td className="py-2 px-4">{contact.expense.toFixed(2)}</td>
                <td className="py-2 px-4">{contact.crisis}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-2 px-4 text-center">No contacts available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsList;
