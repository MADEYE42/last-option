// pages/api/saveData.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  console.log('API request received');  // Log for debugging

  if (req.method === 'POST') {
    const data = req.body;
    console.log('Data received:', data);  // Log the data received

    // Define the file path
    const filePath = path.join(process.cwd(), 'data', 'user_data.json');

    try {
      // Check if the folder exists, if not create it
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      // Write data to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      console.log('Data saved successfully to:', filePath);
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);  // Log the error
      res.status(500).json({ message: 'Failed to save data', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
