// pages/api/requests.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const dataPath = path.join(process.cwd(), 'requests.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8') || '[]');

      const newRequest = req.body; // Body will contain the form data
      data.push(newRequest); // Add the new request to the data array

      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2)); // Save the updated array

      // Send success response
      res.status(200).json({ message: 'Request saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      // Send error response
      res.status(500).json({ error: 'Failed to save request' });
    }
  } else {
    // Method not allowed for non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}
