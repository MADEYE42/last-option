const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware to handle multipart/form-data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create uploads directory if it doesn't exist
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original file name
  },
});
const upload = multer({ storage });

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Crisis Call API');
});

// API route to save user data
app.post('/api/saveUserData', upload.single('document'), (req, res) => {
  const { name, number, address } = req.body;
  const document = req.file;

  // Log incoming request for debugging
  console.log('Body:', req.body);
  console.log('File:', req.file);

  const userData = {
    name,
    number,
    address,
    documentPath: document ? document.path : null,
  };

  const dataPath = path.join(__dirname, 'data', 'users.json');

  // Ensure data file exists and handle it properly if it's empty or invalid
  fs.readFile(dataPath, 'utf8', (err, data) => {
    let users = [];
    
    if (err && err.code === 'ENOENT') {
      // If the file doesn't exist, create it and start with an empty array
      console.log("users.json file not found, creating a new one.");
    } else if (err) {
      return res.status(500).send('Error reading file');
    } else {
      try {
        // Parse the JSON only if it's not empty
        users = JSON.parse(data || '[]');
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return res.status(500).send('Error parsing user data');
      }
    }

    users.push(userData);

    // Write the updated user data back to the file
    fs.writeFile(dataPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving user data');
      }

      res.send('User data saved successfully');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
