import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Path to the requests.json file
    const filePath = path.join(process.cwd(), 'data', 'requests.json');

    // Read the current contents of the JSON file
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if (err) {
        console.error('Could not read file:', err);
        return res.status(500).json({ message: 'Error reading file' });
      }

      // Parse the existing data
      const requests = JSON.parse(fileData || '[]');

      // Add the new request
      requests.push(data);

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(requests, null, 2), (err) => {
        if (err) {
          console.error('Could not write file:', err);
          return res.status(500).json({ message: 'Error writing file' });
        }

        return res.status(201).json({ message: 'Request saved successfully!' });
      });
    });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
